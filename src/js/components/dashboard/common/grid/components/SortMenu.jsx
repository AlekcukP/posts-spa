import React, { Fragment, useContext } from "react";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SortIcon from '@mui/icons-material/Sort';
import Divider from '@mui/material/Divider';
import ToggleMenu from "./ToggleMenu";
import SortMenuHelper from "../helpers/sort/menu";
import ComponentsHelper from "../../../../../helpers/components";
import { Context } from "../Grid";
import { useControls } from "../hooks/useControls";

const Item = ({ field, order, name }) => {
    const { hasMatchingSortRule, handleSortRuleChange } = useContext(Context);

    return (
        <MenuItem
            selected={hasMatchingSortRule(field, order)}
            onClick={() => handleSortRuleChange(field, order)}
        >
            <ListItemIcon>
                { SortMenuHelper.isOrderAsc(order) ? <NorthIcon /> : <SouthIcon /> }
            </ListItemIcon>
            <ListItemText primary={SortMenuHelper.getSortMenuItemSign(order, name)} />
        </MenuItem>
    );
}

const List = () => {
    const { columns } = useContext(Context);
    const sortOrders = _.values(SortMenuHelper.ORDERS);
    const sortableColumns = columns.getSortable().toArray();

    const menuItems = _.map(
        sortableColumns,
        ({ field, headerName }, i) => (
            <Fragment key={ComponentsHelper.generateKey('MenuList')}>
                <MenuList>
                    { _.map(sortOrders, order => (
                        <Item
                            key={ComponentsHelper.generateKey('MenuItem')}
                            field={field}
                            order={order}
                            name={headerName ?? field}
                        />
                    ))}
                </MenuList>
                { sortableColumns.length !== i ? <Divider variant="fullWidth" flexItem /> : null }
            </Fragment>
        )
    );

    return (
        <Paper className="w-60">{ menuItems }</Paper>
    );
}

const SortMenu = () => {
    const {
        sortMenuId,
        sortMenuAnchorEl,
        sortMenuOpen,
        handleSortMenuBtnClick,
        closeSortMenu
    } = useControls();

    return (
        <ToggleMenu
            id={sortMenuOpen ? sortMenuId : undefined}
            name={'Sort'}
            icon={SortIcon}
            onClick={handleSortMenuBtnClick}
            onClickAway={closeSortMenu}
            onClose={closeSortMenu}
            open={sortMenuOpen}
            anchorEl={sortMenuAnchorEl}
        >
            <List/>
        </ToggleMenu>
    );
}

export default SortMenu;
