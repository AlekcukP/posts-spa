import { useState, useMemo, useCallback } from "react";

export const usePostsFilterMenu = () => {
    const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
    const filterMenuOpen = Boolean(filterMenuAnchorEl);
    const filterMenuId = filterMenuOpen ? 'posts-filter-menu' : undefined;

    const handleFilterMenuBtnClick = useCallback(
        (event) => setFilterMenuAnchorEl(filterMenuAnchorEl ? null : event.currentTarget),
        [filterMenuAnchorEl]
    );

    const closePostsFilterMenu = useCallback(
        () => filterMenuOpen && setFilterMenuAnchorEl(null),
        [filterMenuOpen]
    );

    const memoValues = useMemo(
        () => ({ filterMenuAnchorEl, filterMenuOpen, filterMenuId }),
        [filterMenuAnchorEl, filterMenuOpen, filterMenuId]
    );

    return { ...memoValues, handleFilterMenuBtnClick, closePostsFilterMenu };
}
