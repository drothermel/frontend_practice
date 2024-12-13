
/***********************************************
 * Annotations and Text Types
 ***********************************************/
export type AnnotationType = 'plain' | 'strong' | 'emphasis';
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

export type TextFragment = {
    type: AnnotationType;
    content: string;
    annotation_index: number;
}
export const PlainFragment = (content: string): TextFragment => ({
    type: 'plain',
    content,
    annotation_index: -1,
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

export type EntryType = 'empty' | 'page' | 'unknown';
export type EntryData = {
    type: EntryType;
    title: AnnText;
    subtitle: AnnText;
    body: BlockData[],
}
export type EntryTextKey = 'title' | 'subtitle'

// Stored in history array for undo/redo
export type EntryDataState = {
    entry: EntryData
}

export type EntrySessionData = {
    path_elem: AnnText[];
}