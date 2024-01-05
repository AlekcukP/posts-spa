import React, { useContext } from "react";
import _ from "lodash";
import TablePagination from "@mui/material/TablePagination";
import { PostsContext } from "../Content";

const Pagination = () => {
    const {
        postsCount,
        postsPagination: {
            postPage,
            postRecordsPerPage,
            handlePostsChangePage,
            handlePostsChangeRecordsPerPage,
        }
    } = useContext(PostsContext);

    return (
        <TablePagination
            component="div"
            count={postsCount}
            page={postPage}
            rowsPerPage={postRecordsPerPage}
            onPageChange={handlePostsChangePage}
            onRowsPerPageChange={handlePostsChangeRecordsPerPage}
            className="flex items-center self-end min-h-[53px]"
        />
    );
}

export default Pagination;
