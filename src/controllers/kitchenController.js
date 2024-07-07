import { Post, PostModel } from "../models/PostsModel";
import { User, UserModel } from "../models/UserModel";
class KitchenController {
  index(req, res) {
    res.render('kitchen', { currentPage: 'kitchen' })
  }

  async getUserRecipes(req, res) {
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'recent';

    try {
      const userId = req.session.user._id;

      let sortOption;
      if (sort === 'az') {
        sortOption = { recipeTitle: 1 };
      } else {
        sortOption = { createdIn: -1 };
      }

      const totalPosts = await PostModel.countDocuments({ author: userId });
      const totalPages = Math.ceil(totalPosts / 10);

      const posts = await PostModel.find({ author: userId })
        .populate('author', 'username')
        .sort(sortOption)
        .skip((page - 1) * 10)
        .limit(10);

      res.render('myRecipes', {
        posts,
        totalPages,
        pageNum: page,
        currentPage: 'myRecipes',
        sort
      });
    } catch (err) {
      console.log(err);
      res.render('404', { currentPage: '404' });
    }
  }

  async getUserSavedRecipes(req, res) {
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'recent';
  
    try {
      const userId = req.session.user._id;
  
      const user = await UserModel.findById(userId).populate('savedRecipes');
  
      if (!user) {
        return res.render('404', { currentPage: '404' });
      }
  
      const savedRecipes = user.savedRecipes;
  
      let sortOption;
      if (sort === 'az') {
        sortOption = { recipeTitle: 1 };
      } else {
        sortOption = { createdIn: -1 };
      }
  
      const totalPosts = savedRecipes.length;
      const totalPages = Math.ceil(totalPosts / 10);
  

      const paginatedRecipes = savedRecipes
        .sort((a, b) => {
          if (sort === 'az') {
            return a.recipeTitle.localeCompare(b.recipeTitle);
          } else {
            return new Date(b.createdIn) - new Date(a.createdIn);
          }
        })
        .slice((page - 1) * 10, page * 10);
  
      res.render('saved-recipes', {
        posts: paginatedRecipes,
        totalPages,
        pageNum: page,
        currentPage: 'saved-recipes',
        sort
      });
    } catch (err) {
      console.log(err);
      res.render('404', { currentPage: '404' });
    }
  }
  

}

export default new KitchenController()

