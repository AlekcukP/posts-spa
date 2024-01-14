import React, { useReducer } from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Divider from '@mui/material/Divider';
import Stack from "./components/Stack";
import SortMenu from "./components/SortMenu";
import FilterMenu from "./components/FilterMenu";
import { useGridControls } from "./hooks/useGridControls";

const Grid = ({
    columns,
    cell,
    className,
    rows,
    initialState,
    onFilterModelChange,
    onSortModelChange,
    onPaginationModelChange
}) => {
    const {
        refinedRows,
        filterModel,
        sortModel,
        handleSortModelChange,
        handlePageChange,
        handlePageSizeChange,
        handleFilterModelChange,
        paginationModel: { page, pageSize }
    } = useGridControls(initialState, rows, onFilterModelChange, onSortModelChange, onPaginationModelChange);

    return (
        <Box className={classnames('grid-root', className)}>
            <Box className="py-1 px-2 self-start flex w-full">
                <SortMenu
                    fields={columns.getSortableFields()}
                    selected={sortModel}
                    handleSortModelChange={handleSortModelChange}
                />
                <FilterMenu
                    fields={columns.getFilterableFields()}
                    selected={filterModel}
                    handleFilterModelChange={handleFilterModelChange}
                />
            </Box>

            <Divider variant="fullWidth" flexItem />

            <Stack rows={refinedRows} cell={cell} />

            <Divider variant="fullWidth" flexItem />

            <TablePagination
                className="grid-pagination"
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
            />
        </Box>
    );
};

export default Grid;
