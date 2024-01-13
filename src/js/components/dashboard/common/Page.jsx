import React from "react";
import classnames from 'tailwindcss-classnames';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from './Copyright';

const Page = ({ children }) => {
    return (
        <Box
            component="main"
            className={classnames(
                ['flex', 'flex-col', 'items-center', 'justify-evenly', 'w-full', 'h-full', 'sm:ml-20', 'w-[95%]', 'mx-auto', 'md:w-[90vw]']
            )}
        >
            <Container className='m-0 p-0 h-[85vh]'>
                { children }
            </Container>

            <Copyright/>
        </Box>
    );
}

export default Page;