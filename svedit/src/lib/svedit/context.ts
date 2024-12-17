import type { SveditContext, Path, SetPathStatus } from "$lib/svedit/types";
import type SveditSession from "$lib/svedit/SveditSession.svelte";
import type BlockData from "$lib/svedit/BlockData.svelte";
import { setContext, getContext } from "svelte";

const sveditKey = Symbol('svedit');
export function setSveditSession(value: any) {
    setContext(sveditKey, {"session": value});
}

export function setElemByPath(
    path: Path, newKey: number, value: any
): SetPathStatus {
    return getSession().setElemByPath(path, newKey, value);
}

export function getSveditContext(): SveditContext {
    return getContext(sveditKey);
}

export function getSession(): SveditSession {
    return getSveditContext().session;
}

export function getRootBlock(): BlockData | undefined {
    return getSession().rootBlock;
}

export function getElemByPath(path: Path): BlockData | undefined {
    return getSession().getElemByPath(path);
}