import _ from "lodash";

class ColumnsList {
    #list;

    constructor (columns = []) {
        this.#list = Immutable.List(columns);
    }

    static from(columns) {
        return new ColumnsList(columns);
    }

    map(cb) {
        return this.#list.map(cb);
    }

    toArray() {
        return this.#list.toArray();
    }

    getSortableFields() {
        return this.#list.filter(cell => cell?.sortable).map(column => column.field).toArray();
    }

    getFilterableFields() {
        return this.#list.filter(cell => cell?.filterable).map(column => column.field).toArray();
    }

    hasSortableFields() {
        return Boolean(this.getSortableFields().length);
    }

    hasFilterableFields() {
        return Boolean(this.getFilterableFields().length);
    }
}

export default ColumnsList;
