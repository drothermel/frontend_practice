import { type EntryData, type EntryDataState} from './types'

export default class EntrySession {

    entry: EntryData = $state({type: 'empty'});
    history: EntryDataState[] = $state([]);
    future: EntryDataState[] = $state([]);

    constructor(entry: EntryData) {
        this.entry = entry;
    }

    get<K extends keyof EntryData>(key: K): EntryData[K]{
        return this.entry[key];
    }

    set<K extends keyof EntryData>(key: K, value: EntryData[K]) {
        const history_copy = {
            entry: structuredClone($state.snapshot(this.entry)),
        };
        this.entry[key] = value

        // Update history
        this.history = [...this.history, history_copy];
        this.future = [];
    }
}
