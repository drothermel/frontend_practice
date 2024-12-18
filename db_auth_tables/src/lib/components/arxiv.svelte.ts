// File: arxiv.svelte.ts
// See User Manual for more info on the Arxiv API:
//  https://info.arxiv.org/help/api/user-manual.html
import convert from "xml-js";

import type {
    ArxivQueryAndResult,
    ArxivQueryParams,
    ArxivMetadata,
    ArxivResponse,
    ArxivResponseEntry,
    ArxivResponseAuthorField,
    ArxivResponseLinkField
} from '$lib/components/types.ts';

export default class ArxivQueryHandler {
    // Default query params, maxResults higher than api default
    queryBase: string = 'https://export.arxiv.org/api/query?';
    currQuery: ArxivQueryParams = $state({
        start: 0,
        maxResults: 2,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
        author: "Kyunghyun Cho",
    });
    history: ArxivQueryAndResult[] = $state([]);
    resultFeed: object[] = $state([]);

    setQueryParams(params: ArxivQueryParams) {
        this.currQuery = params;
    }

    async queryArxivLoadFeed() {
        let queryStr: string = this.buildQuery(this.currQuery);
        console.log(queryStr);
        const response: Response = await fetch(queryStr);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const textResponse: string = await response.text();
        this.convertResponseTextToJson(textResponse);
    }

    buildQuery(params: ArxivQueryParams): string {
        let query = this.queryBase;
        if (params.ids) {
            query += 'id_list=' + params.ids.join(',') + '&';
        } else {
            query += 'search_query=';
            if (params.title) query += 'ti:' + params.title + '&';
            if (params.author) query += 'au:"' + params.author + '"&';
            if (params.abstract) query += 'abs:' + params.abstract + '&';
            if (params.comment) query += 'co:' + params.comment + '&';
            if (params.journal) query += 'jr:' + params.journal + '&';
            if (params.category) query += 'cat:' + params.category + '&';
            if (params.reportNumber) query += 'rn:' + params.reportNumber + '&';
            if (params.all) query += 'all:' + params.all + '&';
        }
        if (params.start) query += 'start=' + params.start + '&';
        if (params.maxResults) query += 'max_results=' + params.maxResults + '&';
        if (params.sortBy) query += 'sortBy=' + params.sortBy + '&';
        if (params.sortOrder) query += 'sortOrder=' + params.sortOrder + '&';
        if (params.submittedDate) query += 'submittedDate=' + params.submittedDate + '&';
        query = query.slice(0, -1); // remove trailing '&'
        return query;
    }

    convertResponseTextToJson(response: string) {
        const jsonString: string = convert.xml2json(
            response, 
            {
                compact: true,
                spaces: 2,
            }
        );
        const result: ArxivResponse = JSON.parse(jsonString);
        const entries: ArxivResponseEntry[] = result['feed']['entry'];
        this.resultFeed = entries.map((e) => {return this.parseArxivFeedEntry(e)});
    }

    parseArxivFeedEntry(entry: ArxivResponseEntry): ArxivMetadata {
        let metadata: ArxivMetadata =  {
            id: entry.id._text,
            updated: entry.updated._text,
            published: entry.published._text,
            title: entry.title._text.replace(/\r?\n/g, " "),
            summary: entry.summary._text.replace(/\r?\n/g, " "),
            authors: Array.isArray(entry.author) ? entry.author.map(
                (a: ArxivResponseAuthorField) => { return a.name._text; }
            ) : [entry.author.name._text],
            primaryCategory: entry["arxiv:primary_category"]._attributes.term,
            categories: Array.isArray(entry.category) ? entry.category.map(
                (c) => { return c._attributes.term; }) : [entry.category._attributes.term],
        };

        let namedLinks: ArxivResponseLinkField[] = entry.link.filter(
            (l: ArxivResponseLinkField) => {("title" in l)}
        );
        let unnamedLinks: ArxivResponseLinkField[] = entry.link.filter(
            (l: ArxivResponseLinkField) => {!("title" in l)}
        );
        if (namedLinks.length > 0 && "_attributes" in namedLinks[0]) {
            metadata.pdfLink = namedLinks[0]._attributes.href;
        }
        if (unnamedLinks.length > 0 && "_attributes" in unnamedLinks[0]) {
            metadata.absLink = unnamedLinks[0]._attributes.href;
        }
        return metadata;
    }

    authorsToString(authors: string[], query: ArxivQueryParams): string {
        let authorStrings = authors.map((a) => {
            return a == query.author ? `<span class="font-bold">${a}</span>` : a
        });
        return authorStrings.join(", ");
    }

    slugify(text: string) {
        return text
          .replace(/\s/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toLowerCase();
    }
}

