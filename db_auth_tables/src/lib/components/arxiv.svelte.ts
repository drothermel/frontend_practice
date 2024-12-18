// File: arxiv.svelte.ts
// See User Manual for more info on the Arxiv API:
//  https://info.arxiv.org/help/api/user-manual.html
import convert from "xml-js";

import type {
    ArxivQueryAndResult,
    ArxivQueryParams, ArxivResponse, ArxivResult
} from '$lib/components/types.ts';


// TODO: type for result feed!
export default class ArxivQueryHandler {
    // Default query params, maxResults higher than api default
    queryBase: string = 'https://export.arxiv.org/api/query?';
    currQuery: ArxivQueryParams = $state({
        start: 0,
        maxResults: 100,
        sortBy: 'lastUpdatedDate',
        sortOrder: 'descending',
    });
    history: ArxivQueryAndResult[] = $state([]);
    resultFeed: any[] | null = $state(null);


    async queryArxivLoadFeed() {
        let queryStr = this.buildQuery(this.currQuery);
        const response = await fetch(queryStr);
        const textResponse: ArxivResponse = await response.text();
        this.convertResponseToFeed(textResponse);
    }

    convertResponseToFeed(response: ArxivResponse): void {
        const jsonString: string = convert.xml2json(
            response, 
            {
                compact: true,
                spaces: 2,
            }
        );
        const jsonObject = JSON.parse(jsonString);
        const entries = jsonObject["feed"]["entry"] || {};
        this.resultFeed = entries;
    }

    buildQuery(params: ArxivQueryParams): string {
        let query = this.queryBase;
        if (params.ids) {
            query += 'id_list=' + params.ids.join(',') + '&';
        } else {
            if (params.title) query += 'title=' + params.title + '&';
            if (params.author) query += 'author=' + params.author + '&';
            if (params.abstract) query += 'abstract=' + params.abstract + '&';
            if (params.comment) query += 'comment=' + params.comment + '&';
            if (params.journal) query += 'journal_ref=' + params.journal + '&';
            if (params.category) query += 'cat=' + params.category + '&';
            if (params.reportNumber) query += 'report_num=' + params.reportNumber + '&';
            if (params.all) query += 'all=' + params.all + '&';
        }
        if (params.start) query += 'start=' + params.start + '&';
        if (params.maxResults) query += 'max_results=' + params.maxResults + '&';
        if (params.sortBy) query += 'sortBy=' + params.sortBy + '&';
        if (params.sortOrder) query += 'sortOrder=' + params.sortOrder + '&';
        if (params.submittedDate) query += 'submittedDate=' + params.submittedDate + '&';
        query = query.slice(0, -1); // remove trailing '&'
        return query;
    }

    setQueryParams(params: ArxivQueryParams) {
        this.currQuery = params;
    }

    // TODO: We need a type for authors
    authorsToString(authors: any[], query: ArxivQueryParams): string {
        let authorStrings: string[] = [];
        for (const aData of authors) {
            const aName = aData.name._text;
            if (query.author && aName === query.author){
                authorStrings.push(`<span class="font-bold">${aName}</span>`);
            }
            authorStrings.push(aName);
        }
        return authorStrings.join(", ");
    }

    slugify(text: string) {
        return text
          .replace(/\s/g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .toLowerCase();
    }
}

