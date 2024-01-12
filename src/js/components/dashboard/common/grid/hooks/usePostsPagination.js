import { useMemo, useState } from "react";

export const usePostsPagination = () => {
    const [postPage, setPostPage] = useState(0);
    const [postRecordsPerPage, setPostRecordsPerPage] = useState(10);

    const handlePostsChangePage = (e, newPage) => setPostPage(newPage);

    const handlePostsChangeRecordsPerPage = e => {
        setPostRecordsPerPage(parseInt(e.target.value, 10));
        setPostPage(0);
    }

    const memoValues = useMemo(
        () => ({ postPage, postRecordsPerPage }),
        [postPage, postRecordsPerPage]
    );

    return {
        ...memoValues,
        handlePostsChangePage,
        handlePostsChangeRecordsPerPage
    };
}
