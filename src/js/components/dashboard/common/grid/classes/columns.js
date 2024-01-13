import _ from "lodash";

class Columns {
    #list;

    constructor (columns = []) {
        this.#list = Immutable.List(columns);
    }

    static from(columns) {
        return new Columns(columns);
    }

    toArray() {
        return this.#list.toArray();
    }

    getSortable() {
        return this.#list.filter(cell => cell?.sortable);
    }

    getFilterable() {
        return this.#list.filter(cell => cell?.filterable);
    }

    hasSortable() {
        return this.getSortable().size > 0;
    }

    hasFilterable() {
        return this.getFilterable().size > 0;
    }
}

export default Columns;
