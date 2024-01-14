import _ from "lodash";

class SortHelper {
    static ORDERS = {
        ASC: 'asc',
        DESC: 'desc'
    }

    static getMenuItemSign(order, field) {
        return `Sort ${_.upperCase(order)} By ${field}`;
    }

    static isAsc(order) {
        return SortHelper.ORDERS.ASC === order;
    }

    static sort(rows, { field, sort }) {
        return _.orderBy(rows, [field], [sort]);
    }

    static paginate(rows, size) {
        return _.chunk(rows, size);
    }

    static getPage(rows, page) {
        return _.nth(rows, page);
    }
}

export default SortHelper;
