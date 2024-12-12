import { setContext, getContext } from "svelte";
import { type Morsel, type MorselViewerContext } from "$lib/types/types";

const morselViewerKey = Symbol('morselViewer')

export function setMorselViewerContext(context: MorselViewerContext) {
    setContext(morselViewerKey, context);
}

export function getMorselViewerContext(): MorselViewerContext {
    return getContext(morselViewerKey) as MorselViewerContext;
}