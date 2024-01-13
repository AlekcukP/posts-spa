import { useMemo, useState } from "react";

export const usePagination = (initialPage, initialRowsPerPage) => {
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const handleChangePage = (e, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = ({ target: { value } }) => {
        setRowsPerPage(parseInt(value, 10));
        setPage(0);
    }

    const memoValues =  useMemo(
        () => ({ page, rowsPerPage }),
        [page, rowsPerPage]
    );

    return { ...memoValues, handleChangePage, handleChangeRowsPerPage};
}
