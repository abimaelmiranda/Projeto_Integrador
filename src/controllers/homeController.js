import PostModel from '../models/PostsModel';

class HomeController {
    async index(req, res) {
    const posts = await PostModel.homeSearch()
    res.render('index', {
        currentPage: 'home',
        posts: posts
    });
    }
}

export default new HomeController();
