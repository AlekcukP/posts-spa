import _ from "lodash";
import Data from "../classes/data";
import SortMenuHelper from "../helpers/sort/menu";
import { usePagination } from "./usePagination";
import { useSort } from "./useSort";
import { useFilter } from "./useFilter";

export const useGridState = (initialState = {}) => {
    const state = _.merge({
        pagination: { page: 0, pageSize: 10 },
        filter: { items: [], column: null, operator: null, value: null },
        sort: { field: null, order: SortMenuHelper.ORDERS.ASC }
    }, initialState);

    const pagination = usePagination(state.pagination.page, state.pagination.pageSize);
    const sort = useSort(state.sort.field, state.sort.order);
    const filter = useFilter(state.filter.column, state.filter.operator, state.filter.value)

    return { ...pagination, ...sort, ...filter };
}
