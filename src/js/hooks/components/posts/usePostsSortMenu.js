import { useMemo, useState, useCallback } from "react";

export const usePostsSortMenu = () => {
    const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState(null);
    const sortMenuOpen = Boolean(sortMenuAnchorEl);
    const sortMenuId = sortMenuOpen ? 'posts-sort-menu' : undefined;

    const handleSortMenuBtnClick = useCallback(
        (event) => setSortMenuAnchorEl(sortMenuAnchorEl ? null : event.currentTarget),
        [sortMenuAnchorEl]
    );


    const closePostsSortMenu = useCallback(
        () => sortMenuOpen && setSortMenuAnchorEl(null),
        [sortMenuOpen]
    );

    const memoValues = useMemo(
        () => ({ sortMenuAnchorEl, sortMenuOpen, sortMenuId }),
        [sortMenuAnchorEl, sortMenuOpen, sortMenuId]
    );

    return { ...memoValues, handleSortMenuBtnClick, closePostsSortMenu, setSortMenuAnchorEl };
}
