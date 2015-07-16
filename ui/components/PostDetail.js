import React from 'react';
import { State } from 'react-router';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import PostActions from '../actions/PostActions';
import PostStore from '../stores/PostStore';


export default React.createClass({

    mixins: [State, ListenerMixin],

    getInitialState() {
        return PostStore.getState();
    },

    componentWillMount() {
        this.listenTo(PostStore, this.onChange);
    },

    componentDidMount() {
        PostActions.fetchPost(this.getParams().id);
    },

    onChange() {
        this.setState(PostStore.getState());
    },

    render() {
        const post = this.state.postDetail;
        if (!post) {
            return <div>Waiting...</div>;
        }
        return (
            <div>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
            </div>
        );
    }

});



