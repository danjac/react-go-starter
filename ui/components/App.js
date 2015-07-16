import React from 'react';
import { RouteHandler } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

export default React.createClass({
    render() {
        return (
            <div>
                <Navbar brand="react-go-starter">
                    <Nav>
                        <NavItemLink to="postsList">Home</NavItemLink>
                        <NavItemLink to="newPost">Add a post</NavItemLink>
                    </Nav>
                </Navbar>

                <div className="container">
                    <RouteHandler {...this.props} />
                </div>
            </div>
        );
    }
});
