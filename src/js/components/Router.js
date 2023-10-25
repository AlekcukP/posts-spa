import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../templates/Dashboard';
import HomePage from '../pages/Home';
import UsersPage from '../pages/Users';
import AlbumsPage from '../pages/Albums';
import PostsPage from '../pages/Posts';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<HomePage />} />

                <Route element={<Dashboard />}>
                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/users/:userId' element={<UsersPage />} />

                    <Route path='/albums' element={<AlbumsPage />} />
                    <Route path='/albums/:albumId' element={<AlbumsPage />} />

                    <Route path='/posts' element={<PostsPage />} />
                    <Route path='/posts/:postId' element={<PostsPage />} />

                </Route>
                <Route path='*' element={<div>Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
