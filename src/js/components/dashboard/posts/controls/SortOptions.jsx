import React, { useContext } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import Popper from '@mui/material/Popper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { PostsContext } from "../Content";
import { ClickAwayListener } from '@mui/base';

const SortPopupMenu = () => {
    const {
        postsSortMenu: { sortMenuId, sortMenuAnchorEl, sortMenuOpen },
        sortPosts: {
            setAscendingPostsSortOrder,
            setDescendingPostsSortOrder
        }
    } = useContext(PostsContext);

    return (
            <Popper
                id={sortMenuId}
                open={sortMenuOpen}
                anchorEl={sortMenuAnchorEl}
                sx={{width: 240}}
                popperOptions={{placement: 'bottom-start'}}
            >
                <Paper className="w-60">
                    <MenuList>
                        <MenuItem onClick={setAscendingPostsSortOrder}>
                            <ListItemIcon>
                                <NorthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sort ASC By Id" />
                        </MenuItem>
                        <MenuItem onClick={setDescendingPostsSortOrder}>
                            <ListItemIcon>
                                <SouthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sort DESC By Id" />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Popper>
    );
};

const SortOptions = () => {
    const {
        postsSortMenu: { sortMenuId, handleSortMenuBtnClick, closePostsSortMenu }
    } = useContext(PostsContext);

    return (
        <ClickAwayListener onClickAway={closePostsSortMenu}>
            <Box>
                <Button
                    aria-describedby={sortMenuId}
                    onClick={handleSortMenuBtnClick}
                    variant="text"
                    size="small"
                    startIcon={<SortIcon />}
                >
                    Sort
                </Button>

                <SortPopupMenu />
            </Box>
        </ClickAwayListener>
    );
}

export default SortOptions;
