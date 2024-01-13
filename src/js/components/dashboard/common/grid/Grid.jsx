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

const defaultState = {
    pagination: { page: 0, pageSize: 10 },
    filter: { items: [] },
    sorting: { sortModel: [{ field: null, sort: null }] }
}

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
    const [state, dispatch] = useReducer(reducer, {...defaultState, ...initialState});

    const {
        pagination: { page, pageSize },
        filter: { items },
        sorting: { sortModel: [firstSortModel] },
    } = state;

    const handleSortRuleChange = (sortModel) => dispatch({
        type: 'sort_change',
        sortModel: onSortModelChange(sortModel)
    });

    const handleChangePage = (e, page) => {
        dispatch({
            type: 'page_change',
            paginationModel: onPaginationModelChange({ page, pageSize })
        })
    }
    const handlePageSizeChange = ({ target: { value } }) => {
        dispatch({
            type: 'page_size_change',
            paginationModel: onPaginationModelChange({ page: 0, pageSize: parseInt(value, 10) })
        });
    };

    const sortedRows = _.orderBy(rows, [firstSortModel.field], [firstSortModel.sort])

    return (
        <Box className={classnames(
            [
                "flex",
                "flex-col",
                "border-[1px]",
                "border-gray-300",
                "border-solid",
                "rounded items-center",
                "w-full",
                "basis-full",
                "h-[72vh]",
                "lg:h-[75vh]"
            ],
            className
        )}>
            <Box className="py-1 px-2 self-start flex w-full">
                { columns.hasSortableFields() && <SortMenu
                    fields={columns.getSortableFields()}
                    selected={firstSortModel}
                    onSortModelChange={handleSortRuleChange}
                /> }
                { columns.hasFilterableFields() && <FilterMenu
                    fields={columns.getFilterableFields()}
                /> }
            </Box>

            <Divider variant="fullWidth" flexItem />

            <Stack rows={sortedRows} cell={cell} />

            <Divider variant="fullWidth" flexItem />

            <TablePagination
                className="grid-pagination flex items-center min-h-12 w-full justify-center md:justify-end bg-white"
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={pageSize}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handlePageSizeChange}
            />
        </Box>
    );
}

export default Grid;
