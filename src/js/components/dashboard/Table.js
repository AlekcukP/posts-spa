import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import EmptyDataOverlay from "./EmptyDataOverlay";

const Table = ({ rows, columns, ...props }) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            slots={{
                noRowsOverlay: EmptyDataOverlay,
            }}
            {...props}
        />
    );
};

export default Table;