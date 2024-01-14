import React, { Fragment } from "react";
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
import SortHelper from "../../../../../helpers/sort";
import ComponentsHelper from "../../../../../helpers/components";
import { useFilterSortControls } from "../hooks/useFilterSortControls";

const ListItem = ({ order, name, selected, onClick }) => {
    return (
        <MenuItem selected={selected} onClick={onClick}>
            <ListItemIcon>
                { SortHelper.isAsc(order) ? <NorthIcon /> : <SouthIcon /> }
            </ListItemIcon>
            <ListItemText primary={SortHelper.getMenuItemSign(order, name)} />
        </MenuItem>
    );
}

const List = ({ fields, selected, handleSortModelChange }) => {
    const menuItems = _.map(fields, (field, index) => (
        <Fragment key={ComponentsHelper.generateKey('MenuList')}>
            <MenuList>
                { _.map(_.values(SortHelper.ORDERS), order => (
                    <ListItem
                        key={ComponentsHelper.generateKey('MenuItem')}
                        order={order}
                        name={field}
                        onClick={() => handleSortModelChange([{ field, sort: order }])}
                        selected={_.isEqual(selected, { field, sort: order })}
                    />
                ))}
            </MenuList>
            { fields.length !== index && <Divider variant="fullWidth" flexItem /> }
        </Fragment>)
    );

    return (
        <Paper className="w-60">{ menuItems }</Paper>
    );
}

const SortMenu = (props) => {
    const {
        sortMenuId,
        sortMenuAnchorEl,
        sortMenuOpen,
        handleSortMenuBtnClick,
        closeSortMenu
    } = useFilterSortControls();

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
            <List { ...props }/>
        </ToggleMenu>
    );
}

export default SortMenu;
