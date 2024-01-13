import React, { useContext } from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";
import { Context } from "../Grid";

const ControlBar = () => {
    const { columns } = useContext(Context);

    if (columns.size < 1) return null;

    const sortMenu = columns.hasSortable() ? <SortMenu /> : null;
    const filterMenu = columns.hasFilterable() ? <FilterMenu /> : null;

    return (
        <Box className="py-1 px-2 self-start flex w-full">
            { sortMenu }
            { filterMenu }
        </Box>
    );
}

export default ControlBar;
