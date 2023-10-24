import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideBar from '../components/dashboard/SideBar';
import SideBarDrawer from '../components/dashboard/SideBarDrawer';
import Copyright from '../components/dashboard/Copyright';
import AppBar from '../components/dashboard/AppBar';

const Dashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <Box className="flex">
            <AppBar open={open} toggleSidebar={toggleSidebar} />
            <SideBarDrawer variant="permanent" open={open}>
                <Toolbar className='flex items-center justify-end px-[1px]'>
                    <IconButton onClick={toggleSidebar}><ChevronLeftIcon /></IconButton>
                </Toolbar>
                <Divider />
                <SideBar />
            </SideBarDrawer>
            <Box component="main" className='h-screen grow overflow-auto bg-gray-100 mt-16'>
                <Container maxWidth="lg" className='my-1'>
                    <Outlet />
                </Container>
                <Copyright className='pt-1'/>
            </Box>
        </Box>
    );
};

export default Dashboard;