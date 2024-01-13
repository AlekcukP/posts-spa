import _ from "lodash";

class SortMenuHelper {
    static ORDERS = {
        ASC: 'asc',
        DESC: 'desc'
    }

    static getSortMenuItemSign(order, field) {
        return `Sort ${_.upperCase(order)} By ${field}`;
    }

    static isOrderAsc(order) {
        return order === SortMenuHelper.ORDERS.ASC;
    }
}

export default SortMenuHelper;
