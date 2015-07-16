import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './components/App';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

export default (
    <Route name="home" path="/" handler={App}>
        <DefaultRoute name="postsList" handler={PostList} />
        <Route path="/posts/new" name="newPost" handler={PostForm} />
        <Route path="/posts/:id" name="postDetail" handler={PostDetail} />
    </Route>
);

