import React, { useMemo } from "react";
import Card from "./common/Card";
import Table from "./common/Table";
import ColumnsList from "../../classes/columnsList";
import { useGetAlbums } from "../../api/albums";
import { getGridStringOperators } from "@mui/x-data-grid";
import { useQueryParams } from "./common/grid/hooks/useQueryParams";

const columns = ColumnsList.from([
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
]);

const AlbumsContent = () => {
    const { albumRecords, error, isLoading } = useGetAlbums();
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
            title={"Albums"}
            subheader={"Discover All Albums Retrieved from the API"}
            isLoading={isLoading}
            error={error}
        >
            <Table
                className="h-[72vh] lg:h-[75vh]"
                rows={albumRecords}
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

export default AlbumsContent;
