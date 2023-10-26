import React, { createContext } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import SideBar from '../components/dashboard/SideBar';
import AppBar from '../components/dashboard/AppBar';
import Page from '../components/dashboard/Page';
import { useSidebarToggle } from '../hooks/components/useSidebarToggle';

const DashboardContext = createContext(null);

const DashboardTemplate = () => {
    return (
        <DashboardContext.Provider value={{ sidebarToggle: useSidebarToggle() }}>
            <Box className="flex h-full">
                <AppBar />
                <SideBar />
                <Page>
                    <Outlet />
                </Page>
            </Box>
        </DashboardContext.Provider>
    );
};

export { DashboardContext };
export default DashboardTemplate;