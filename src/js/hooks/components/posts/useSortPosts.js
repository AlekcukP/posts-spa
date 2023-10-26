import { useCallback, useMemo, useState } from "react";
import { sortOrders, defaultSortField } from "../../../utils/sortRecords";

export const useSortPosts = () => {
    const [postsSortOrder, setPostsSortOrder] = useState(sortOrders.asc);
    const [postsSortField, setPostsSortField] = useState(defaultSortField);

    const setAscendingPostsSortOrder = useCallback(() => setPostsSortOrder(sortOrders.asc), []);
    const setDescendingPostsSortOrder = useCallback(() => setPostsSortOrder(sortOrders.desc), []);
    const changePostsSortField = useCallback(fieldName => setPostsSortField(fieldName), []);

    const memoValues =  useMemo(
        () => ({ postsSortOrder, postsSortField }),
        [ postsSortOrder, postsSortField ]
    );

    return { ...memoValues, setAscendingPostsSortOrder, setDescendingPostsSortOrder, changePostsSortField };
}
