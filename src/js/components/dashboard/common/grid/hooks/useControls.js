import { useMemo, useState, useCallback, useId } from "react";

export const useControls = () => {
    const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState(null);
    const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
    const filterMenuOpen = Boolean(filterMenuAnchorEl);
    const sortMenuOpen = Boolean(sortMenuAnchorEl);
    const sortMenuId = useId();
    const filterMenuId = useId();

    const handleSortMenuBtnClick = useCallback(
        e => {
            setSortMenuAnchorEl(sortMenuAnchorEl ? null : e.currentTarget);
        },
        [sortMenuAnchorEl]
    );

    const handleFilterMenuBtnClick = useCallback(
        e => {
            setFilterMenuAnchorEl(filterMenuAnchorEl ? null : e.currentTarget)
        },
        [filterMenuAnchorEl]
    );

    const closeSortMenu = useCallback(
        () => sortMenuOpen && setSortMenuAnchorEl(null),
        [sortMenuOpen]
    );

    const closeFilterMenu = useCallback(
        () => filterMenuOpen && setFilterMenuAnchorEl(null),
        [filterMenuOpen]
    );

    const memoValues =  useMemo(
        () => ({ sortMenuOpen, filterMenuOpen, sortMenuAnchorEl, filterMenuAnchorEl, sortMenuId, filterMenuId }),
        [sortMenuOpen, filterMenuOpen, sortMenuAnchorEl, filterMenuAnchorEl, sortMenuId, filterMenuId]
    );

    return {
        ...memoValues,
        handleSortMenuBtnClick,
        handleFilterMenuBtnClick,
        closeFilterMenu,
        closeSortMenu
    };
}
