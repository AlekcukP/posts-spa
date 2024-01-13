class FilterRules {
    #rules;

    constructor() {
        this.#rules = new Immutable.Map();
    }

    static create(field = null, filter = null) {
        const rules = new FilterRules;

        if (field && filter) {
            rules.add(field, filter);
        }

        return rules;
    }

    add(field, filter) {
        if (field && _.isString(field) && filter && _.isObject(filter) && !_.isEmpty(filter)) {
            this.#rules.set(field, filter);
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
            return _.isEqual(this.get(field), value);
        }

        return false;
    }

    toArray() {
        return Array.from(this.#rules, ([key, value]) => ({ field: key, ...value }));
    }
}

export default FilterRules;
