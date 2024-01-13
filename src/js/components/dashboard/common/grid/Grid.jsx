import React, { createContext } from "react";
import _ from "lodash";
import classnames from "tailwindcss-classnames";
import EmptyDataOverlay from "../EmptyDataOverlay";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Pagination from "./components/Pagination";
import ControlBar from "./components/ControlBar";
import Data from "./classes/data";
import Stack from "./components/Stack";
import Columns from "./classes/columns";
import { useGridState } from "./hooks/useGridState";

const Context = createContext(null);

const Grid = (props) => {
    const { className, rows, initialState, columns } = props;
    const state = useGridState(initialState);

    const collection = Data.from(rows);
    const columnsList = Columns.from(columns);

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
            <Context.Provider value={{
                ...state,
                ...props,
                rows: collection.sortBy(state.sortRules).paginateBy(state.rowsPerPage).get(state.page),
                count: collection.count(),
                columns: columnsList
            }}>
                <ControlBar />

                <Divider variant="fullWidth" flexItem />

                { collection.count() < 0 ? <EmptyDataOverlay /> : <Stack /> }

                <Divider variant="fullWidth" flexItem />

                <Pagination />
            </Context.Provider>
        </Box>
    );
}

export { Context };
export default Grid;
