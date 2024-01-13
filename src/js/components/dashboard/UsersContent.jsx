import React, { useMemo } from "react";
import _ from "lodash";
import Card from "./common/Card";
import Table from "./common/Table";
import { useGetUsers } from "../../api/users";
import { LinkCell } from "./common/Table";
import { getGridStringOperators } from "@mui/x-data-grid";
import ColumnsList from "../../classes/columnsList";
import { useQueryParams } from "./common/grid/hooks/useQueryParams";

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
    const { userRecords, error, isLoading } = useGetUsers();
    const { searchParams, omitSearchParams, mergeSearchParams } = useQueryParams();

    const memoColumns = useMemo(
        () => columns.map(column => {
            return column.filterable ? {
                ...column,
                filterOperators: getGridStringOperators()
                    .filter(operator => operator.value === 'equals')
                    .map(operator => ({ ...operator }))
            } : column;
        }).toArray(), []);

        const handleFilterChange = filterModel => {
            console.log(filterModel);
            omitSearchParams(columns.getFilterableFields());

            if (filterModel?.items?.length) {
                const { field, value } = _.first(filterModel.items);

                mergeSearchParams(
                    field && value ? { [field]: value } : {}
                );
            }

            return filterModel;
        }

        const handleSortChange = sortModel => {
            omitSearchParams(['field', 'sort']);

            if (!_.isEmpty(sortModel)) {
                const { field, sort } = _.first(sortModel);

                mergeSearchParams(
                    field && sort ? { field, sort } : {}
                );
            }

            return sortModel;
        }

        const handlePaginationChange = ({ page, pageSize }) => {
            omitSearchParams(['page', 'pageSize']);

            if (_.isInteger(page) && _.isInteger(pageSize)) mergeSearchParams({ page, pageSize });

            return { page, pageSize };
        }

    return (
        <Card
            title={"Users List"}
            subheader={"Browse All Users Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Table
                className="h-[72vh] lg:h-[75vh]"
                rows={userRecords}
                columns={memoColumns}
                pageSizeOptions={[5, 10, 15]}
                onFilterModelChange={handleFilterChange}
                onSortModelChange={handleSortChange}
                onPaginationModelChange={handlePaginationChange}
                disableMultipleColumnsFiltering={false}
                initialState={{
                    pagination: {
                        paginationModel: { page: searchParams.get('page') ?? 0, pageSize: searchParams.get('pageSize') ?? 10 },
                    },
                    filter: {
                        filterModel: {
                            items: [
                                { field: 'id', operator: 'equals', value: searchParams.get('id') },
                                { field: 'userId', operator: 'equals', value: searchParams.get('userId') },
                            ],
                        },
                    },
                    sorting: {
                        sortModel: [
                            { field: searchParams.get('field'), sort: searchParams.get('sort') }
                        ],
                    },
                }}
            />
        </Card>
    );
};

export default UsersContent;