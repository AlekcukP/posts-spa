import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import EmptyDataOverlay from "./EmptyDataOverlay";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LinkCell = ({ to }) => {
    return (
        <Link to={to}>
            <OpenInNewIcon color="primary"/>
        </Link>
    );
}

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

export { LinkCell };
export default Table;