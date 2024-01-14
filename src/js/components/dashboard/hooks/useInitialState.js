import _ from "lodash";
import { useQueryParams } from "./useQueryParams";

export const useInitialState = (filterableFields) => {
    const { getSearchParam, searchParamPresent } = useQueryParams();

    const filterItems = [];
    _.each(
        filterableFields,
        field => searchParamPresent(field) && filterItems.push({ field, operator: '=', value: getSearchParam(field) })
    )

    return {
        pagination: { paginationModel: {
            page: getSearchParam('page', true, 0),
            pageSize: getSearchParam('pageSize', true, 10)
        }},
        filter: { filterModel: { items: filterItems }},
        sorting: { sortModel: [
            { field: getSearchParam('field', false), sort: getSearchParam('sort', false) }
        ]}
    }
}
