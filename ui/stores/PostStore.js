import alt from '../alt';
import PostActions from '../actions/PostActions';

class PostStore {
    constructor() {
        this.bindActions(PostActions);
        this.posts = [];
        this.postDetail = null;
    }

    fetchPosts(posts) {
        this.posts = posts || [];
    }

    fetchPost(post) {
        this.postDetail = post;
    }

    newPost(post) {
        this.posts.push(post);
    }
}

export default alt.createStore(PostStore);
