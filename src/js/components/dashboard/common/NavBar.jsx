import React from "react";
import { styled } from '@mui/material/styles';
import classnames from 'tailwindcss-classnames';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const StyledBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    height: 64,
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

const NavBar = ({ onClick, isOpen }) => {

    return <StyledBar position='static' open={isOpen}>
        <Toolbar className='pr-6'>
            <IconButton
                edge="start"
                color="inherit"
                onClick={onClick}
                className={classnames('mr-9', { 'hidden': isOpen })}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                className='grow'
                noWrap
            >
                Dashboard
            </Typography>
        </Toolbar>
    </StyledBar>;
};

export default NavBar;