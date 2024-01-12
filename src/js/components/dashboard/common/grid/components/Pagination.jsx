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
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="flex items-center self-end min-h-[53px]"
        />
    );
}

export default Pagination;
