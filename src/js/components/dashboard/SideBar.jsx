import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsIcon from '@mui/icons-material/Collections';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DashboardContext } from '../../templates/DashboardTemplate';

const SideBarDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const Tab = ({icon: Icon, name, to}) => {
    return (
        <NavLink to={to} className='group no-underline text-gray-600'>
            <ListItemButton className='group-[.active]:bg-gray-200'>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name}/>
            </ListItemButton>
        </NavLink>
    );
}

const SideBar = () => {
    const { sidebarToggle: { isSidebarOpen, toggleSidebar }} = useContext(DashboardContext);

    return (
        <SideBarDrawer variant="permanent" open={isSidebarOpen}>
            <Toolbar className='flex items-center justify-end px-[1px]'>
                <IconButton onClick={toggleSidebar}><ChevronLeftIcon /></IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <Tab icon={PeopleIcon} name={"Users"} to={"/users"}/>
                <Tab icon={LibraryBooksIcon} name={"Posts"} to={"/posts"}/>
                <Tab icon={CollectionsIcon} name={"Albums"} to={"/albums"}/>
            </List>
        </SideBarDrawer>
    );
};

export default SideBar;
