import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {Link} from 'react-router';
import PostActions from '../actions/PostActions';
import PostStore from '../stores/PostStore';


export default React.createClass({

    mixins: [ListenerMixin],

    getInitialState() {
        return PostStore.getState();
    },

    componentWillMount() {
        this.listenTo(PostStore, this.onChange);
    },

    componentDidMount() {
        PostActions.fetchPosts();
    },

    onChange() {
        this.setState(PostStore.getState());
    },

    render() {
        return (
            <ul>
                {this.state.posts.map(function(post) {
                    return <li key={post.id}><Link to="postDetail" params={{id: post.id}}>{post.title}</Link></li>;
                })}
            </ul>
        );
    }
});
