import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (column, operator) => {
    const [filterColumn, setFilterColumn] = useState(column);
    const [filterOperator, setFilterOperator] = useState(operator);
    const [filterValue, setFilterValue] = useState(null);

    const [searchParams] = useSearchParams();

    const handleFilterOperatorChange = ({ target: { value } }) => setFilterOperator(value);
    const handleFilterColumnChange = ({ target: { value } }) => setFilterColumn(value);
    const handleFilterValueChange = ({ target: { value } }) => setFilterValue(value);

    const onResetFiltersBtnClick = useCallback(() => {
        if (_.isEmpty(filterValue)) setFilterMenuAnchorEl(null);

        for (const key of searchParams.keys()) {
            searchParams.delete(key);
        }

        setFilterValue(null);
    }, [filterValue]);


    const memoValues =  useMemo(
        () => ({ filterColumn, filterOperator, filterValue }),
        [filterColumn, filterOperator, filterValue]
    );

    return { ...memoValues, handleFilterColumnChange, handleFilterOperatorChange, handleFilterValueChange, onResetFiltersBtnClick };
}
