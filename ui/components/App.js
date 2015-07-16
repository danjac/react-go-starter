import React from 'react';
import { RouteHandler } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

export default React.createClass({
    render() {
        return (
            <div>
                <Navbar brand="blog">
                    <Nav>
                        <NavItemLink to="postsList">Home</NavItemLink>
                    </Nav>
                </Navbar>

                <div className="container">
                    <RouteHandler {...this.props} />
                </div>
            </div>
        );
    }
});
