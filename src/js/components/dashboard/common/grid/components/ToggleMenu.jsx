import React from "react";
import _ from "lodash";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { ClickAwayListener } from '@mui/base';

const TogglePopup = ({ children, id, open, anchorEl, onClose }) => {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={onClose}
        >
            { children }
        </Popover>
    );
};

const ToggleButton = ({ icon: Icon, onClick, describedby, name }) => {
    return (
        <Button
            variant="text"
            aria-describedby={describedby}
            onClick={onClick}
            startIcon={<Icon />}
        >
            { name }
        </Button>
    );
}

const ToggleMenu = ({
    icon: Icon,
    id,
    name,
    onClick,
    onClickAway,
    onClose,
    open,
    anchorEl,
    children
}) => {
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Box>
                <ToggleButton icon={Icon} onClick={onClick} name={name} describedby={id}/>
                <TogglePopup id={id} open={open} anchorEl={anchorEl} onClose={onClose}>
                    { children }
                </TogglePopup>
            </Box>
        </ClickAwayListener>
    );
}

export default ToggleMenu;
