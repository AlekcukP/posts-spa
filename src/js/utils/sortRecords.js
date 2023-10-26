import _ from "lodash";

export const defaultSortField = 'id';

export const sortOrders = {
    asc: 'asc',
    desc: 'desc'
}

export const sortRecords = (records, field, order) => {
    return _.orderBy(records, field, order);
}
