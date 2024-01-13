import React, { useContext } from "react";
import _ from "lodash";
import TablePagination from "@mui/material/TablePagination";
import { Context } from "../Grid";

const Pagination = () => {
    const {
        count,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    } = useContext(Context);

    return (
        <TablePagination
            className="grid-pagination flex items-center min-h-12 w-full justify-center md:justify-end bg-white "
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}

export default Pagination;
