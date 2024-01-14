import React, { useReducer } from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Divider from '@mui/material/Divider';
import Stack from "./components/Stack";
import SortMenu from "./components/SortMenu";
import FilterMenu from "./components/FilterMenu";
import reducer from "./utils/reducer";
import { usePipe } from "../../hooks/usePipe";
import { filterRecords } from "./utils/filterRecords";

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const pipe = usePipe();

    const {
        pagination: { paginationModel: { page, pageSize } },
        filter: { filterModel: { items: [filterModelItem] } },
        sorting: { sortModel: [sortModelItem] },
    } = state;

    const handleSortModelChange = pipe(
        onSortModelChange,
        (sortModel) => dispatch({type: 'sort_model_change', sortModel})
    );

    const handlePageChange = pipe(
        (e, page) => ({ page, pageSize: state.pagination.paginationModel.pageSize }),
        onPaginationModelChange,
        paginationModel => dispatch({ type: 'pagination_model_change', paginationModel })
    );

    const handlePageSizeChange = pipe(
        ({ target: { value } }) => ({ page: 0, pageSize: parseInt(value, 10) }),
        onPaginationModelChange,
        paginationModel => dispatch({ type: 'pagination_model_change', paginationModel })
    );

    const handleFilterModelChange = pipe(
        (filterModelItem) => ({ items: [filterModelItem] }),
        onFilterModelChange,
        (filterModel) => dispatch({type: 'filter_model_change', filterModel})
    );

    const processRows = pipe(
        rows => filterRecords(rows, filterModelItem),
        rows => _.orderBy(rows, [sortModelItem.field], [sortModelItem.sort]),
        rows => _.chunk(rows, pageSize),
        rows => _.nth(rows, page)
    );

    const processedRows = processRows(rows);

    return (
        <Box className={classnames(
            [
                "flex",
                "flex-col",
                "border-[1px]",
                "border-gray-300",
                "border-solid",
                "rounded",
                "items-center",
                "w-full",
                "basis-full",
                "h-[72vh]",
                "lg:h-[75vh]"
            ],
            className
        )}>
            <Box className="py-1 px-2 self-start flex w-full">
                <SortMenu
                    fields={columns.getSortableFields()}
                    selected={sortModelItem}
                    handleSortModelChange={handleSortModelChange}
                />
                <FilterMenu
                    fields={columns.getFilterableFields()}
                    selected={filterModelItem}
                    handleFilterModelChange={handleFilterModelChange}
                />
            </Box>

            <Divider variant="fullWidth" flexItem />

            <Stack rows={processedRows} cell={cell} />

            <Divider variant="fullWidth" flexItem />

            <TablePagination
                className="grid-pagination flex items-center min-h-12 w-full justify-center md:justify-end bg-white"
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
            />
        </Box>
    );
}

export default Grid;
