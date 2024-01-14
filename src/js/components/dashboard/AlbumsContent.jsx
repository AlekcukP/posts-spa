import React, { useMemo } from "react";
import Card from "./common/Card";
import Table from "./common/Table";
import ColumnsList from "../../classes/columnsList";
import { getGridStringOperators } from "@mui/x-data-grid";
import { useQueryParams } from "./hooks/useQueryParams";
import { useGetData } from "./hooks/useGetData";
import { useInitialState } from "./hooks/useInitialState";

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
    const { updateFilterSearchParams, updatePaginationSearchParams, updateSortSearchParams } = useQueryParams();
    const { data, error, isLoading } = useGetData('albums');
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
            title={"Albums"}
            subheader={"Discover All Albums Retrieved from the API"}
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
                disableMultipleColumnsFiltering={false}
                initialState={initialState}
            />
        </Card>
    );
};

export default AlbumsContent;
