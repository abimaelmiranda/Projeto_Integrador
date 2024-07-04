import { Post } from '../models/PostsModel';

class HomeController {
    async index(req, res) {
    const posts = await Post.homeSearch()
    res.render('index', {
        currentPage: 'home',
        posts: posts
    });
    }
}

export default new HomeController();
