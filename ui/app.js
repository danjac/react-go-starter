import React from 'react';
import Router from 'react-router';
import routes from './routes';

const router = Router.create({
    location: Router.HashLocation,
    routes: routes
});

router.run((Handler, state) => {
    React.render(<Handler {...state} />, document.body);
});

