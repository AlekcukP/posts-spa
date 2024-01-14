import React, { useMemo } from "react";
import _ from "lodash";
import Card from "./common/Card";
import Table from "./common/Table";
import { LinkCell } from "./common/Table";
import { getGridStringOperators } from "@mui/x-data-grid";
import ColumnsList from "../../classes/columnsList";
import { useQueryParams } from "./hooks/useQueryParams";
import { useGetData } from "./hooks/useGetData";
import { useInitialState } from "./hooks/useInitialState";

const columns = ColumnsList.from([
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
        sortable: false,
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
]);

const UsersContent = () => {
    const { updateFilterSearchParams, updatePaginationSearchParams, updateSortSearchParams } = useQueryParams(columns.getFilterableFields());
    const { data, error, isLoading } = useGetData('users');
    const initialState = useInitialState();

    const memoColumns = useMemo(
        () => columns.map(column => {
            return column.filterable ? {
                ...column,
                filterOperators: getGridStringOperators()
                    .filter(operator => operator.value === 'equals')
                    .map(operator => ({ ...operator }))
            } : column;
        }).toArray(), []);

    return (
        <Card
            title={"Users List"}
            subheader={"Browse All Users Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Table
                className="h-[72vh] lg:h-[75vh]"
                rows={data}
                columns={memoColumns}
                pageSizeOptions={[5, 10, 15]}
                onFilterModelChange={updateFilterSearchParams}
                onSortModelChange={updateSortSearchParams}
                onPaginationModelChange={updatePaginationSearchParams}
                initialState={initialState}
            />
        </Card>
    );
};

export default UsersContent;