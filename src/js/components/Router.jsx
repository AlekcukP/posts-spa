import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardTemplate from '../templates/DashboardTemplate';
import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage';
import AlbumsPage from '../pages/AlbumsPage';
import PostsPage from '../pages/PostsPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<HomePage />} />

                <Route element={<DashboardTemplate />}>
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
