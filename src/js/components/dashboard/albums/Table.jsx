import React, { useMemo } from "react";
import Table from "../common/Table";
import { getGridStringOperators } from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 320,
        sortable: true,
        filterable: true
    },
    {
        field: 'userId',
        headerName: 'User ID',
        width: 320,
        sortable: true,
        filterable: true
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 320,
        sortable: false,
        filterable: false
    },
];

const AlbumsTable = ({ rows }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const memoColumns = useMemo(
        () => _.map(columns, column => {
            return column.filterable ? {
                ...column,
                filterOperators: getGridStringOperators()
                    .filter(operator => operator.value === 'equals')
                    .map(operator => ({ ...operator }))
            } : column;
        }), []);

    const onFilterChange = filterModel => {
        if (filterModel.items.length) {
            const { field, value } = _.first(filterModel.items);

            if (searchParams.size) {
                for (const key of searchParams.keys()) {
                    searchParams.delete(key);
                }
            }

            if (value) {
                searchParams.set(field, value);
            }

            setSearchParams(searchParams.toString());
        }

        return filterModel;
    };

    return (
            <Table
                className="h-5/6"
                rows={rows}
                columns={memoColumns}
                pageSizeOptions={[5, 10, 15]}
                onFilterModelChange={onFilterChange}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'id', operator: 'equals', value: searchParams.get('id') },
                                { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
                            ],
                        },
                    },
                }}
            />
    );
}

export default AlbumsTable;
