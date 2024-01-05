import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from './Copyright';

const Page = ({ children }) => {
    return (
        <Box component="main" className='grow overflow-hidden bg-gray-100 h-full'>
            <Container maxWidth="lg" className='h-full pt-20 pb-6'>
                { children }
            </Container>

            <Copyright className='mt-[-21px]'/>
        </Box>
    );
}

export default Page;