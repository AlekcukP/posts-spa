import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import NoRowsOverlay from "./NoRowsOverlay";

const Table = ({ rows, columns, ...props }) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            slots={{
                noRowsOverlay: NoRowsOverlay,
            }}
            {...props}
        />
    );
};

export default Table;