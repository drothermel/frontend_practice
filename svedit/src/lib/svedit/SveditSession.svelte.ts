import type { 
    SveditStateData, 
    Path, 
    PathIndex, 
    SetPathStatus
} from './types'
import type BlockData from '$lib/svedit/BlockData.svelte'

export default class SveditSession {

    sveditSessionState: SveditStateData = $state({})
    rootBlock?: BlockData = $derived(this.sveditSessionState.rootBlock)
    history: SveditStateData[] = $state([]);
    future: SveditStateData[] = $state([]);

    constructor(rootBlock?: BlockData){
        this.sveditSessionState.rootBlock = rootBlock
    }

    getElemByPath(path: Path = []): any {
        let elem: any = this.rootBlock;
        for (let key of path) {
            elem = elem?.[key];
            if (elem === undefined) break;
        }
        return elem;
    }

    canSetKey(elem: any, newKey: PathIndex): boolean {
        if (elem === undefined || elem === null) return false;

        if (Array.isArray(elem)) {
            if (typeof newKey === 'number') {
                if (newKey == -1){
                    return true;
                }
                return newKey >=0 && newKey <= elem.length && Number.isInteger(newKey);
            }
            return false; // I don't want to set string keys in an array
        } else if (typeof elem === 'object'){
            return true;
        }
        return false;
    }

    setElemByPath(path: Path, newKey: PathIndex, value: any): SetPathStatus {
        // Record current state for history
        const startStateCopy = structuredClone(
            $state.snapshot(this.sveditSessionState)
        )

        // Get existing element to add (key, value) to.
        // The path points to the existing element to set the
        // new key, value in so the elem at the end of the path
        // needs to be defined.
        let existingElem: any = this.rootBlock;
        for (const [index, path_key] of path.entries()) {
            // Index if the path element exists in existingElem
            let next = existingElem?.[path_key];
            if (next === undefined) {
                return {
                    success: false,
                    missingPath: path.slice(index),
                }
            }
            existingElem = next;
        }

        // If the existingElement has been found, verify that the key
        // type matches the element type
        if (!this.canSetKey(existingElem, newKey)) {
            // TODO: does this need to be a snapshot or clone of snapshot??
            return {
                success: false,
                failedElem: existingElem,
            }
        }

        // Create a new element if the path element does not exist
        if (newKey == -1 && Array.isArray(existingElem) ) {
            // -1 means append to end of array
            existingElem.push(value)
        } else {
            existingElem[newKey] = value
        }

        // Update the history object if setting was successful
        this.history = [...this.history, startStateCopy];
        this.future = [];
        return {success: true};
    }
}
