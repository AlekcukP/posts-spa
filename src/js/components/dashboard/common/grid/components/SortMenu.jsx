import React, { useState, useCallback } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SortIcon from '@mui/icons-material/Sort';

import ToggleMenu, { ToggleButton, TogglePopup } from "./ToggleMenu";

const SortToggleMenu = () => {
    const [sortMenuAnchorEl, setSortMenuAnchorEl] = useState(null);
    const sortMenuOpen = Boolean(sortMenuAnchorEl);
    const sortMenuId = sortMenuOpen ? 'grid-sort-menu' : undefined;
    // const sortMenuId = 'grid-sort-menu';
    const sortBtnId = 'grid-sort-btn';

    const handleSortToggleMenuClick = useCallback(
        e => {
            console.log(e.currentTarget)
            const anchorEl = sortMenuAnchorEl ? null : e.currentTarget;
            setSortMenuAnchorEl(anchorEl)
        },
        [sortMenuAnchorEl]
    );


    const closeSortPopup = useCallback(
        () => sortMenuOpen && setSortMenuAnchorEl(null),
        [sortMenuOpen]
    );

    const SortToggleButton = () => <ToggleButton
        id={sortBtnId}
        controls={sortMenuId}
        describedby={sortMenuId}
        onClick={handleSortToggleMenuClick}
        icon={SortIcon}
        name={'Sort'}
    />

    const SortTogglePopup = () => <TogglePopup
        isOpen={sortMenuOpen}
        id={sortMenuId}
        anchorEl={sortMenuAnchorEl}
        // labelledby={sortBtnId}
    >
        <Paper className="w-60">
            <MenuList>
                <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                        <NorthIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sort ASC By Id" />
                </MenuItem>
                <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                        <SouthIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sort DESC By Id" />
                </MenuItem>
            </MenuList>
        </Paper>
    </TogglePopup>

    return (
        <ToggleMenu
            button={SortToggleButton}
            popup={SortTogglePopup}
            onClickAway={closeSortPopup}
            describedby={sortMenuId}
        />
    );
}

export default SortToggleMenu;
