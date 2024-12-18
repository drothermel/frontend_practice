export type ArxivQueryParams = {
    start?: number;
    maxResults?: number;
    sortBy?: string;
    sortOrder?: string;
    // Format: [YYYYMMDDTTTT+TO+YYYYMMDDTTTT]
    //    eg: submittedDate:[202301010600+TO+202401010600]
    submittedDate?: string; 
    // triggers id_list query
    ids?: string[]; 
    // trigger search query
    title?: string; 
    author?: string; 
    abstract?: string;
    comment?: string; 
    journal?: string; 
    category?: string;
    reportNumber?: string; 
    all?: string; // searches in all fields simultaneously
    queryOperators?: string; // default is 'AND'
}
// Note: If both id_list and search queries are triggered
// then the id_list query results will be filtered by search query

export type ArxivQueryOperators = 'AND' | 'OR' | 'ANDNOT';
export type ArxivSortByKeys = 'relevance' | 'lastUpdatedDate' | 'submittedDate';
export type ArxivSortOrderKeys = 'ascending' | 'descending';

export type ArxivMetadata = {
    id?: string;
    updated?: string;
    published?: string;
    title?: string;
    summary?: string;
    authors?: string[];
    absLink?: string;
    pdfLink?: string;
    primaryCategory?: string;
    categories?: string[];
    doi?: string;
    comment?: string;
    journal?: string;
    reportNumber?: string;
}

export type ArxivQueryAndResult = {
    query: ArxivQueryParams;
    result: ArxivMetadata[];
}

export type ArxivResponseTextField = {
    _text: string;
}
export type ArxivResponseAuthorField = {
    name: ArxivResponseTextField;
}
export type ArxivResponseLinkField = {
    _attributes: {
        title?: string;
        href: string;
        rel: string;
        type: string;
    }
}
export type ArxivResponseCategoryField = {
    _attributes: {
        term: string;
        scheme: string;
        "xmlns:string"?: string;
    }
}
export type ArxivResponseEntry = {
    id: ArxivResponseTextField;
    updated: ArxivResponseTextField;
    published: ArxivResponseTextField;
    title: ArxivResponseTextField;
    summary: ArxivResponseTextField;
    author: ArxivResponseAuthorField[] | ArxivResponseAuthorField;
    link: ArxivResponseLinkField[];
    category: ArxivResponseCategoryField[] | ArxivResponseCategoryField;
    "arxiv:primary_category": ArxivResponseCategoryField;
}
type ArxivResponseOpenSearch = {
    _attributes: {
        "xmlns:opensearch": string;
    };
    _text: string;
}
export type ArxivResponse = {
    feed: {
        entry: ArxivResponseEntry[];
    };
    id: ArxivResponseTextField;
    link: ArxivResponseLinkField; // query link
    "opensearch:itemsPerPage": ArxivResponseOpenSearch;
    "opensearch:startIndex": ArxivResponseOpenSearch;
    "opensearch:totalResults": ArxivResponseOpenSearch;
    title: {
        _attributes: {
            type: string;
        };
        _text: string;
    };
    updated: ArxivResponseTextField;
    _attributes: {
        xmlns: string;
    };
    _declaration: {
        _attributes: {
            version: string;
            encoding: string;
        }
    };
}