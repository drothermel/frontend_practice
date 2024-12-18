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

export type ArxivResponse = string;
export type ArxivResult = any;

export type ArxivQueryAndResult = {
    query: ArxivQueryParams;
    result: ArxivResult[];
}