import { useQueryParams } from "./useQueryParams"

export const useInitialState = () => {
    const { searchParams } = useQueryParams();

    const filterItems = [
        { field: 'id', operator: '=', value: _.toNumber(searchParams.get('id')) },
        { field: 'userId', operator: '=', value: _.toNumber(searchParams.get('userId')) }
    ].filter(item => item.value);

    return {
        pagination: { paginationModel: {
            page: _.toNumber(searchParams.get('page')),
            pageSize: _.toNumber(searchParams.get('pageSize')) || 10
        }},
        filter: { filterModel: { items: filterItems } },
        sorting: { sortModel: [
            { field: searchParams.get('field'), sort: searchParams.get('sort') }
        ]}
    }
}
