const PostModel = require('../models/PostsModel')


exports.homePage = async (req, res) => {
    const posts = await PostModel.homeSearch()
    res.render('index', {
        currentPage: 'home',
        posts: posts
    });
}