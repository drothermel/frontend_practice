
/***********************************************
 * Annotations and Text Types
 ***********************************************/
export type AnnotationType = 'strong' | 'emphasis';
export type Annotation = {
    type: AnnotationType;
    start_idx: number;
    end_idx: number;
}
export const StrongAnn = (
    start_idx: number,
    end_idx: number
): Annotation => ({
    type: 'strong',
    start_idx,
    end_idx,
})

export type AnnText = {
    text: string;
    annotations: Annotation[];
}
export const PreAnnText = (
    text: string,
): AnnText => ({
    text,
    annotations: [],
})

export type FragmentOrString = Fragment | string
export type Fragment = {
    type: string;
    content: string;
    annotation_index: number;
    href: string;
    target: any;
}

/***********************************************
 * Block Types
 ***********************************************/

export interface BlockData {
    type: string;
    title: AnnText;
    description: AnnText;
}
export interface StoryBlockData extends BlockData {
    image: string;
    layout: number;
}

/***********************************************
 * Entry Session Types
 ***********************************************/

export type EntryType = 'page' | 'unknown';
export type EntryData = {
    type: EntryType;
    title: AnnText;
    subtitle: AnnText;
    body: BlockData[],
}

export type EntrySessionData = {
    path_elem: AnnText[];
}
/**
 * svedit = {
 *    'entry_session': { 
 *         path_elem: [
 *              text, 
 *              Annotation[]
 *        ],
 *       ...}
 * }
 */
// 



