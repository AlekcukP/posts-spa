import React, { createContext } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import SideBar from './common/SideBar';
import NavBar from './common/NavBar';
import Page from './common/Page';
import { useSidebar } from '../../hooks/components/common/useSidebar';

const DashboardContext = createContext(null);

const Dashboard = () => {
    return (
        <DashboardContext.Provider value={{ ...useSidebar() }}>
            <Box className="flex h-full">
                <NavBar />
                <SideBar />
                <Page>
                    <Outlet />
                </Page>
            </Box>
        </DashboardContext.Provider>
    );
};

export { DashboardContext };
export default Dashboard;
