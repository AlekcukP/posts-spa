import { useMemo, useState, useCallback } from "react";

export const useFilter = (column, operator) => {
    const [filterColumn, setFilterColumn] = useState(column);
    const [filterOperator, setFilterOperator] = useState(operator);
    const [filterValue, setFilterValue] = useState(null);

    const handleFilterOperatorChange = ({ target: { value } }) => setFilterOperator(value);
    const handleFilterColumnChange = ({ target: { value } }) => setFilterColumn(value);
    const handleFilterValueChange = ({ target: { value } }) => setFilterValue(value);

    const onResetFiltersBtnClick = useCallback(() => {
        _.isEmpty(filterValue) && setFilterMenuAnchorEl(null) || setFilterValue(null);
    }, [filterValue]);


    const memoValues =  useMemo(
        () => ({ filterColumn, filterOperator, filterValue }),
        [filterColumn, filterOperator, filterValue]
    );

    return { ...memoValues, handleFilterColumnChange, handleFilterOperatorChange, handleFilterValueChange, onResetFiltersBtnClick };
}
