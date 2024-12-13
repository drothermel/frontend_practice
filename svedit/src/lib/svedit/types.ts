
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
}
export interface PageBlockData extends BlockData {
    title: AnnText;
    body: BlockData[];
}
export interface TextBlockData extends BlockData {
    text: AnnText[];
}
export interface StoryBlockData extends BlockData {
    title: AnnText;
    description: AnnText;
    image: string;
    layout: number;
}

/***********************************************
 * Entry Session Types
 ***********************************************/
export type PathIndex = number | string;
export type Path = PathIndex[];

export type SetPathStatus = {
    success: boolean;
    missingPath?: Path;
    failedElem?: any;
}

export type EntryType = 'empty' | 'page' | 'unknown';
export type EntryData = {
    type: EntryType;
    title: AnnText;
    subtitle: AnnText;
    body: BlockData[],
}
export type EntryTextKey = 'title' | 'subtitle'

// Stored in history array for undo/redo
export type SveditStateData = {
    rootBlock?: PageBlockData;
}

export type EntrySessionData = {
    path_elem: AnnText[];
}