import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsIcon from '@mui/icons-material/Collections';
import List from '@mui/material/List';

const Tab = ({icon: Icon, name, to}) => {
    return (
        <NavLink to={to} className='no-underline [&.active]:bg-gray-200' style={{color: 'rgba(0, 0, 0, 0.87)'}}>
            <ListItemButton className='active [&.active]:bg-gray-200'>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name}/>
            </ListItemButton>
        </NavLink>
    );
}

const Sidebar = () => {
    return (
        <List component="nav">
            <Tab icon={PeopleIcon} name={"Users"} to={"/users"}/>
            <Tab icon={LibraryBooksIcon} name={"Posts"} to={"/posts"}/>
            <Tab icon={CollectionsIcon} name={"Albums"} to={"/albums"}/>
        </List>
    );
};

export default Sidebar;
