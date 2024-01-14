import React, { useReducer, useEffect } from "react";
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
        filter: { items },
        sorting: { sortModel: [sortModelItem] },
    } = state;

    const handleSortModelChange = pipe(
        onSortModelChange,
        (sortModel) => dispatch({type: 'sort_model_change', sortModel})
    );

    const handlePageChange = (e, page) => {
        dispatch({
            type: 'pagination_model_change',
            paginationModel: onPaginationModelChange({ page, pageSize })
        })
    }

    const handlePageSizeChange = ({ target: { value } }) => {
        dispatch({
            type: 'pagination_model_change',
            paginationModel: onPaginationModelChange({ page: 0, pageSize: parseInt(value, 10) })
        });

    };

    const handleFilterModelChange = (filterModel) => {
        dispatch({
            type: 'filter_model_change',
            filterModel: onFilterModelChange(filterModel)
        });
    };

    const sortedRows = _.orderBy(rows, [sortModelItem.field], [sortModelItem.sort]);
    const chunkedRows = _.chunk(sortedRows, pageSize);
    const pageRows = _.nth(chunkedRows, page);

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
                    onSortModelChange={handleSortModelChange}
                />
                <FilterMenu
                    fields={columns.getFilterableFields()}
                />
            </Box>

            <Divider variant="fullWidth" flexItem />

            <Stack rows={pageRows} cell={cell} />

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
