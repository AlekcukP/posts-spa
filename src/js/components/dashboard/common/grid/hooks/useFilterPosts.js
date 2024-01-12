import _ from "lodash";
import { useState, useMemo } from "react";
import { filterOperators } from "../utils/filterRecords";

export const useFilterPosts = () => {
    const [postsFilterColumn, setPostsFilterColumn] = useState(null);
    const [postsFilterOperator, setPostsFilterOperator] = useState(filterOperators.equal);
    const [postsFilterValue, setPostsFilterValue] = useState(null);

    const handleFilterOperatorChange = ({ target: { value } }) => setPostsFilterOperator(value);
    const handleFilterColumnChange = ({ target: { value } }) => setPostsFilterColumn(value);
    const handleFilterValueChange = ({ target: { value } }) => setPostsFilterValue(value);
    const resetFilterValue = () => setPostsFilterValue('');

    const memoValues = useMemo(
        () => ({ postsFilterColumn, postsFilterOperator, postsFilterValue }),
        [postsFilterColumn, postsFilterOperator, postsFilterValue]
    );

    return {
        ...memoValues,
        handleFilterColumnChange,
        handleFilterOperatorChange,
        handleFilterValueChange,
        resetFilterValue
    };
}
