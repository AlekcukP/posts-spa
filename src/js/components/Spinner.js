import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box className='flex justify-center items-center h-full w-full'>
            <CircularProgress />
        </Box>
    );
}

export default Spinner;
