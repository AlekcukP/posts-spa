import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return <Box className="h-full w-full flex justify-center items-center bg-gradient-circle">
    <Card variant="outlined" className="max-w-md">
      <CardContent className="h-full flex justify-evenly flex-col items-center text-center">
          <ErrorOutlineIcon style={{ fontSize: 120, color: '#FF4500' }} />
          <Typography variant="h4" className="mt-4 font-bold">
            404 - Not Found
          </Typography>
          <Typography variant="subtitle1" className="mt-2 text-gray-600">
            Oops! The page you are looking for might be in another castle.
          </Typography>
          <Link to="/" className="mt-4">
            <Button variant="contained" color="primary">
              Go Home
            </Button>
          </Link>
      </CardContent>
    </Card>
  </Box>;
};

export default NotFound;
