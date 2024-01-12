import React, { useMemo, useCallback } from "react";
import _ from "lodash";
import Table from "../common/Table";
import { LinkCell } from "../common/Table";
import { getGridStringOperators } from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70,
        sortable: true,
        filterable: true
},
    {
        field: 'username',
        headerName: 'Username',
        width: 150,
        sortable: true,
        filterable: false
},
    {
        field: 'name',
        headerName: 'Full Name',
        width: 150,
        sortable: false,
        filterable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 180,
        sortable: false,
        filterable: false
    },
    {
        field: 'website',
        headerName: 'Website',
        width: 120,
        sortable: false,
        filterable: false
    },
    {
        field: 'city',
        headerName: 'City',
        width: 120,
        sortable: false,
        filterable: false,
        valueGetter: (params) => {
            return params.row.address.city;
        }
    },
    {
        field: 'company',
        headerName: 'Company',
        width: 120,
        sortable: false,
        filterable: false,
        valueGetter: (params) => {
            return params.row.company.name;
        }
    },
    {
        field: 'posts',
        headerName: 'Posts',
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: params => <LinkCell to={`/posts?userId=${params.id}`}/>
    },
    {
        field: 'albums',
        headerName: 'Albums',
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: params => <LinkCell to={`/albums?userId=${params.id}`}/>
    }
];

const UsersTable = ({ rows }) => {
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
                            ],
                        },
                    },
                }}
            />
    );
};

export default UsersTable;
