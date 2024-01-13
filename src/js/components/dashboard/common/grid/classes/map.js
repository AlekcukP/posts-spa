class SortRules {
    #rules;

    constructor() {
        this.#rules = new Map();
    }

    static create(field = null, order = null) {
        const sortRules = new SortRules;

        if (field && order) {
            sortRules.add(field, order);
        }

        return sortRules;
    }

    add(field, order) {
        if (field && _.isString(field) && order && _.isString(order)) {
            this.#rules.set(field, order);
        }

        return this;
    }

    get(field) {
        return this.#rules.get(field);
    }

    has(field) {
        return this.#rules.has(field);
    }

    delete(field) {
        this.#rules.delete(field);
        return this;
    }

    clear() {
        this.#rules.clear();
        return this;
    }

    equal(field, value) {
        if (this.has(field)) {
            return this.get(field) === value;
        }

        return false;
    }

    toArray() {
        return Array.from(this.#rules, ([key, value]) => ({ field: key, order: value }));
    }
}

export default SortRules;
