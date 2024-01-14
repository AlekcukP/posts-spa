import React, { useMemo } from "react";
import Card from "./common/Card";
import Table from "./common/Table";
import ColumnsList from "../../classes/columnsList";
import { getGridNumericOperators } from "@mui/x-data-grid";
import { useQueryParams } from "./hooks/useQueryParams";
import { useGetData } from "./hooks/useGetData";
import { useInitialState } from "./hooks/useInitialState";

const columns = ColumnsList.from([
    {
        field: 'id',
        headerName: 'ID',
        width: 320,
        sortable: true,
        filterable: true,
        type: 'number'
    },
    {
        field: 'userId',
        headerName: 'User ID',
        width: 320,
        sortable: true,
        filterable: true,
        type: 'number'
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
    const {
        updateFilterSearchParams,
        updatePaginationSearchParams,
        updateSortSearchParams
    } = useQueryParams(columns.getFilterableFields());
    const { data, error, isLoading } = useGetData('albums');
    const initialState = useInitialState(columns.getFilterableFields());

    const memoColumns = useMemo(
        () => columns.map(column => {
            return column.filterable ? {
                ...column,
                filterOperators: getGridNumericOperators()
                    .filter(operator => operator.value === '=')
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
                initialState={initialState}
            />
        </Card>
    );
};

export default AlbumsContent;
