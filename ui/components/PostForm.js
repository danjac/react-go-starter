import React from 'react';
import { Navigation } from 'react-router';
import { Input, ButtonInput } from 'react-bootstrap';
import PostActions from '../actions/PostActions';

export default React.createClass({

    mixins: [Navigation],

    handleSubmitForm(event) {
        event.preventDefault();

        const title = this.refs.title.getValue(),
              text = this.refs.text.getValue();

        if (title && text) {
            PostActions.newPost(title, text);
            this.transitionTo('home');
        }

    },

    render() {
        return (
            <form onSubmit={this.handleSubmitForm}>
                <Input ref="title" type="text" label="Title" placeholder="Title" />
                <Input ref="text" type="textarea" label="Text" placeholder="Title" />
                <ButtonInput type="submit" value="Submit" />
            </form>
        );
    }
});
