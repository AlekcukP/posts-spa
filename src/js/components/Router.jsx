import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardTemplate from '../templates/DashboardTemplate';
import HomePage from '../pages/HomePage';
import UsersPage from '../pages/UsersPage';
import AlbumsPage from '../pages/AlbumsPage';
import PostsPage from '../pages/PostsPage';

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' exact element={<Home />} />

                <Route element={<Dashboard />}>
                    <Route path='/users' element={<UsersContent />} />
                    <Route path='/users/:userId' element={<UsersContent />} />

                    <Route path='/albums' element={<AlbumsContent />} />
                    <Route path='/albums/:albumId' element={<AlbumsContent />} />

                    <Route path='/posts' element={<PostsContent />} />
                    <Route path='/posts/:postId' element={<PostsContent />} />
                </Route>

                <Route path='*' element={<div>Not Found</div>} />
            </Routes>
        </HashRouter>
    );
}

export default Router;
