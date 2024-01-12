import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Home from './Home';
import UsersContent from './dashboard/users/Content';
import AlbumsContent from './dashboard/albums/Content';
import PostsContent from './dashboard/posts/Content';
import NotFound from './NotFound';

const Router = () => {
    return (
        <BrowserRouter>
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

                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
