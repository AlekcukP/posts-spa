import { useQueryParams } from "./useQueryParams"

export const useInitialState = () => {
    const { searchParams } = useQueryParams();

    return {
        pagination: { paginationModel: {
            page: _.toNumber(searchParams.get('page')),
            pageSize: _.toNumber(searchParams.get('pageSize')) || 10
        }},
        filter: { filterModel: { items: [
            { field: 'id', operator: 'equals', value: searchParams.get('id') },
            { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
        ]}},
        sorting: { sortModel: [
            { field: searchParams.get('field'), sort: searchParams.get('sort') }
        ]},
    }
}
