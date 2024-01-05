import React from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import SortOptions from "./SortOptions";
import FilterOptions from "./FilterOptions";

const ControlsMenu = () => {
    return (
        <Box className="py-1 px-2 self-start flex">
            <FilterOptions />
            <SortOptions />
        </Box>
    );
}

export default ControlsMenu;
