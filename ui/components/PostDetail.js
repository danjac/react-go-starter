import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
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
        PostActions.fetchPost(this.props.params.id);
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
                <h3>{post.title} #{this.props.params.id}</h3>
                <p>{post.text}</p>
            </div>
        );
    }

});



