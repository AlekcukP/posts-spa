import { useCallback, useMemo, useState } from "react";

export const usePostsPagination = () => {
    const [postPage, setPostPage] = useState(0);
    const [postRecordsPerPage, setPostRecordsPerPage] = useState(10);

    const handlePostsChangePage = useCallback((event, newPage) => setPostPage(newPage), []);

    const handlePostsChangeRecordsPerPage = useCallback((event) => {
        setPostRecordsPerPage(parseInt(event.target.value, 10));
        setPostPage(0);
    }, []);

    const memoValues = useMemo(
        () => ({ postPage, postRecordsPerPage, setPostRecordsPerPage }),
        [postPage, postRecordsPerPage]
    );

    return {
        ...memoValues,
        handlePostsChangePage,
        handlePostsChangeRecordsPerPage
    };
}
