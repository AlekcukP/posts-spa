import React, { useContext } from "react";
import { styled } from '@mui/material/styles';
import classnames from 'tailwindcss-classnames';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DashboardContext } from "../Dashboard";

const StyledBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 240,
        width: 'calc(100% - 240px)',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBar = () => {
    const { isSidebarOpen, openSidebar } = useContext(DashboardContext);

    return <StyledBar position="absolute" open={isSidebarOpen} className="h-16">
        <Toolbar className='pr-6'>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={openSidebar}
                className={classnames('mr-9', {'hidden': isSidebarOpen})}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className='grow'
            >
                Dashboard
            </Typography>
        </Toolbar>
    </StyledBar>
}

export default NavBar;