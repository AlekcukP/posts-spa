import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../templates/Dashboard';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Albums from '../pages/Albums';
import Posts from '../pages/Posts';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />} />

                <Route element={<Dashboard />}>
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/:userId' element={<Users />} />

                    <Route path='/albums' element={<Albums />} />
                    <Route path='/albums/:albumId' element={<Albums />} />

                    <Route path='/posts' element={<Posts />} />
                    <Route path='/posts/:postId' element={<Posts />} />

                </Route>
                <Route path='*' element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
