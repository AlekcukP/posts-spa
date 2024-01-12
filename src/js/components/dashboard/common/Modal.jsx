import React, { useState } from "react";
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Modal = ({ title, description, open = false, type }) => {
    const [isOpen, setIsOpen] = useState(open);
    const handleClose = () => setIsOpen(false);

    return (
        <MuiModal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    { title }
                </Typography>
                <Typography id="modal-modal-description" className="mt-4">
                    { description }
                </Typography>
                <Button
                    variant="contained"
                    color={type}
                    size="small"
                    sx={{marginTop: 4, alignSelf: 'end'}}
                    onClick={handleClose}
                >
                    Ok
                </Button>
            </Box>
        </MuiModal>
    );
}

export default Modal;
