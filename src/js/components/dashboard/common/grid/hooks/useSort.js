import { useMemo, useState, useCallback } from "react";

export const useSort = (field, order) => {
    const [sortRules, setSortRules] = useState(field && order ? [{ field, order }] : []);

    const handleSortRuleChange = (field, order) => setSortRules([{ field, order }]);

    const hasMatchingSortRule = useCallback((field, order) => {
        return _.every(sortRules, rule => _.isEqual(_.pick(rule, ['field', 'order']), { field, order }));
    }, [sortRules]);

    const memoValues =  useMemo(
        () => ({ sortRules }),
        [sortRules]
    );

    return { ...memoValues, handleSortRuleChange, hasMatchingSortRule };
}
