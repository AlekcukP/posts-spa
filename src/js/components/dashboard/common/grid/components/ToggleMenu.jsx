import React from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Menu from '@mui/material/Menu';
import { ClickAwayListener } from '@mui/base';

const TogglePopup = ({ id, isOpen, anchorEl, children, labelledby }) => {
    return (
        <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            sx={{width: 240}}
            // popperOptions={{placement: 'bottom-start'}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            aria-labelledby={labelledby}
        >
            { children }
        </Popover>
    );
};

const ToggleButton = ({ icon: Icon, onClick, isOpen, controls, describedby, name, id }) => {
    return (
        <Button
            id={id}
            aria-controls={isOpen ? controls : undefined}
            aria-describedby={describedby}
            aria-expanded={isOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={onClick}
            variant="text"
            startIcon={<Icon />}
        >
            { name }
        </Button>
    );
}

const ToggleMenu = ({ button: Button, popup: Popup, onClickAway }) => {
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Box>
                <Button />
                <Popup />
            </Box>
        </ClickAwayListener>
    );
}

export { ToggleButton, TogglePopup };
export default ToggleMenu;
