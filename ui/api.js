import request from 'superagent-promise';
import prefix from 'superagent-prefix';

class Api {
    constructor() {

        this.prefix = prefix(window.BlogApiVersion);

        this.json = req => {
            req.set("Content-Type", "application/json");
            return req;
        };
    }

    getPosts() {
        return request
        .get("/")
        .use(this.prefix)
        .end()
        .then(res => res.body.posts);
    }

    getPost(id) {
        return request
        .get("/" + id)
        .use(this.prefix)
        .end()
        .then(res => res.body);
    }
}

export default new Api();
