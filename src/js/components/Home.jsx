import React from "react";
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Box className="h-full w-full flex justify-center items-center bg-gradient-circle">
            <Card variant="outlined" className="max-w-md h-1/2">
                <CardContent className="h-full flex justify-evenly flex-col">
                    <Typography
                        component="h3"
                        variant="h3"
                        align="center"
                        color="text.primary"
                    >
                        Posts React SPA
                    </Typography>

                    <Typography variant="body1" align="center" color="text.secondary" paragraph>
                        This app has been crafted to showcase my proficiency in front-end development.
                        Leveraging React, Material UI, and Tailwind libraries, I've brought this project to life.
                        Simply click the button below to explore the main dashboard
                    </Typography>

                    <Button variant="contained" size="large" className="mx-auto">
                        <Link className="no-underline text-slate-200" to='/users'>Getting Started</Link>
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Home;
