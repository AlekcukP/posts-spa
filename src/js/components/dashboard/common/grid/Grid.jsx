import React, { useState, createContext, useContext, isValidElement } from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiStack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Pagination from "./components/Pagination";
import ControlBar from "./components/ControlBar";

const sortOrders = {
    asc: 'asc',
    desc: 'desc'
}

const filterOperators = {
    equal: '=',
    notEqual: '!=',
    above: '>',
    aboveOrEqual: '>=',
    less: '<',
    lessOrEqual: '<=',
    isEmpty: 'isEmpty',
    isNotEmpty: 'isNotEmpty'
}

const Context = createContext(null);

const GridCell = ({ row, key }) => {
    const { Cell } = useContext(Context);

    if (_.isFunction(Cell)) {
        return <Cell key={key} row={row} />;
    }

    return (
        <Paper elevation={3} key={key}>
            { row.toString() }
        </Paper>
    );
}

const EmptyDataOutput = () => {
    const { slots } = useContext(Context);
    const PropsEmptyDataOutput = slots?.noRowsOverlay;

    if (!_.isEmpty(slots) && _.isFunction(PropsEmptyDataOutput)) return <PropsEmptyDataOutput />;

    return (
        <Typography variant="button" display="block">
            Empty Data
        </Typography>
    );
}

const Content = () => {
    const { rows } = useContext(Context);

    if (_.isEmpty(rows)) return <EmptyDataOutput />;

    return (
        <MuiStack direction="row" useFlexGap flexWrap="wrap" className="justify-evenly overflow-auto grow">
            { _.map(rows, (row, index) => <GridCell row={row} key={`grid_cell_${index}`}/>) }
        </MuiStack>
    );
}

const Grid = ({
    Cell,
    className,
    cells,
    rows,
    pageSizeOptions,
    onFilterChange,
    initialState = {},
    slots = {}
}) => {
    const [page, setPage] = useState(initialState?.pagination?.page ?? 0);
    const [rowsPerPage, setRowsPerPage] = useState(initialState?.pagination?.pageSize ?? 10);

    const handleChangePage = (e, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const [sortOrder, setSortOrder] = useState(sortOrders.asc);
    const [sortField, setSortField] = useState('id');

    const setAscendingSortOrder = () => setSortOrder(sortOrders.asc);
    const setDescendingSortOrder = () => setSortOrder(sortOrders.desc);
    const changeSortField = fieldName => setSortField(fieldName);

    const contextValue = {
        Cell,
        rows,
        slots,
        sortField,
        sortOrder,
        count: rows.length,
        page: page,
        rowsPerPage: rowsPerPage,
        setAscendingSortOrder,
        setDescendingSortOrder,
        changeSortField,
        handleChangePage: handleChangePage,
        handleChangeRowsPerPage: handleChangeRowsPerPage
    };

    const classNames = classnames(
        [
            "flex",
            "flex-col",
            "border-[1px]",
            "border-gray-300",
            "border-solid",
            "rounded items-center"
        ],
        {
            "h-[38rem]": rows.length > 6,
            "min-h-[38rem]":  rows.length < 6
        },
        className
    );

    return (
        <Box className={classNames}>
            <Context.Provider value={contextValue}>
                <ControlBar />

                <Content />

                <Divider variant="fullWidth" flexItem />

                <Pagination />
            </Context.Provider>
        </Box>
    );
}

export { Context };
export default Grid;
