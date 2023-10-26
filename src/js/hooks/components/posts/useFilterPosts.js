import _ from "lodash";
import { useState, useMemo, useCallback } from "react";
import { filterOperators } from "../../../utils/filterRecords";

export const useFilterPosts = () => {
    const [postsFilterColumn, setPostsFilterColumn] = useState(null);
    const [postsFilterOperator, setPostsFilterOperator] = useState(filterOperators.equal);
    const [postsFilterValue, setPostsFilterValue] = useState(null);

    const handleFilterOperatorChange = useCallback(({ target: { value } }) => setPostsFilterOperator(value), []);
    const handleFilterColumnChange = useCallback(({ target: { value } }) => setPostsFilterColumn(value), []);
    const handleFilterValueChange = useCallback(({ target: { value } }) => setPostsFilterValue(value), []);

    const resetFilterValue = useCallback(() => setPostsFilterValue(''), []);

    const memoValues =  useMemo(
        () => ({ postsFilterColumn, postsFilterOperator, postsFilterValue, setPostsFilterValue, setPostsFilterColumn }),
        [postsFilterColumn, postsFilterOperator, postsFilterValue, setPostsFilterValue, setPostsFilterColumn]
    );

    return {
        ...memoValues,
        handleFilterColumnChange,
        handleFilterOperatorChange,
        handleFilterValueChange,
        resetFilterValue
    };
}
