import type SveditSession from "./SveditSession.svelte";
import type BlockData from "./BlockData.svelte";

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

export type BlockType = 'text' | 'page' | 'story' | 'list' | 'unknown';
export type FlowType = 'inline' | 'distinct' | 'card';
export type ImageLayoutType = 'left' | 'right' | 'top' | 'bottom';

/***********************************************
 * Svedit Session Types
 ***********************************************/
export type SveditContext = {
    session: SveditSession;
}

// Stored in history array for undo/redo
export type SveditStateData = {
    rootBlock: BlockData;
}

export type PathIndex = number;
export type Path = PathIndex[] | null;

export type Success = boolean;
export type SetPathStatus = {
    success: boolean;
    missingPath?: Path;
    failedElem?: any;
}

