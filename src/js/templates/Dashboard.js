import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import SideBar from '../components/dashboard/SideBar';
import AppBar from '../components/dashboard/AppBar';
import Page from '../components/dashboard/Page';

const Dashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <Box className="flex h-full">
            <AppBar open={open} toggleSidebar={toggleSidebar} />
            <SideBar open={open} toggleSidebar={toggleSidebar}/>
            <Page>
                <Outlet />
            </Page>
        </Box>
    );
};

export default Dashboard;