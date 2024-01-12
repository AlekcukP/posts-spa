import { useMemo, useState } from "react";
import { sortOrders, defaultSortField } from "../../../components/dashboard/posts/controls/utils/sortRecords";

export const useSortPosts = () => {
    const [postsSortOrder, setPostsSortOrder] = useState(sortOrders.asc);
    const [postsSortField, setPostsSortField] = useState(defaultSortField);

    const setAscendingPostsSortOrder = () => setPostsSortOrder(sortOrders.asc);
    const setDescendingPostsSortOrder = () => setPostsSortOrder(sortOrders.desc);
    const changePostsSortField = fieldName => setPostsSortField(fieldName);

    const memoValues =  useMemo(
        () => ({ postsSortOrder, postsSortField }),
        [postsSortOrder, postsSortField]
    );

    return { ...memoValues, setAscendingPostsSortOrder, setDescendingPostsSortOrder, changePostsSortField };
}
