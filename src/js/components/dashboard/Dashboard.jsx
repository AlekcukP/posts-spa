import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import SideBar from './common/SideBar';
import NavBar from './common/NavBar';
import Page from './common/Page';

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Box className="flex flex-col bg-gray-100 h-full w-full md:w-auto">
            <NavBar onClick={() => setSidebarOpen(true)} isOpen={isSidebarOpen} />
            <SideBar onClick={() => setSidebarOpen(false)} isOpen={isSidebarOpen}/>
            <Page>
                <Outlet />
            </Page>
        </Box>
    );
};

export default Dashboard;
