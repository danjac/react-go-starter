import alt from '../alt';
import api from '../api';

class PostActions {
    constructor() {
    }

    async fetchPosts() {
        const posts = await api.getPosts();
        this.dispatch(posts);
    }

    async fetchPost(id) {
        const post = await api.getPost(id);
        this.dispatch(post);
    }

    async newPost(title, text) {
        const post = await api.createPost(title, text);
        this.dispatch(post);
    }

}

export default alt.createActions(PostActions);
