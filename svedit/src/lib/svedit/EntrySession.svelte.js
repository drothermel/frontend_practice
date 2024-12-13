export default class EntrySession {

    entry = $state();
    history = $state();
    future = $state();

    constructor(entry) {
        this.entry = entry;
        this.history = [];
        this.future = [];
    }

    get(path) {
        let current = this.entry
        for (let key of path) {
            if (current == null) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    }

    set(path, value) {
        const history_copy = {
            entry: structuredClone($state.snapshot(this.entry)),
        };

        if (path.length === 0) {
            return value;
        }

        
        let current = this.entry;
        for (let i = 0; i< path.length - 1; i++) {
            if (current[path[i]] === undefined) {
                current[path[i]] = typeof path[i + 1] === 'number ' ? [] : {};
            }
            current = current[path[i]];
        }

        current[path[path.length - 1]] = value

        // Update history
        this.history = [...this.history, history_copy];
        this.future = [];
        return current;
    }

}