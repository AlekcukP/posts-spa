import React from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import SortToggleMenu from "./SortMenu";

const ControlBar = () => {
    return (
        <Box className="py-1 px-2 self-start flex">
            <SortToggleMenu />
        </Box>
    );
}

export default ControlBar;
