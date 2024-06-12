import Post from "../models/PostsModel";
class KitchenController {
  index(req, res){
    res.render('kitchen', { currentPage: 'kitchen' })
  }

  async getUserRecipes(req, res) {
    
    try {
      const post = new Post(req.body, req);
      const recipes = await post.searchMyRecipes();

      if(post.errors.length > 0){
        req.session.save(() => {
          res.flash('errors', post.errors);
          return res.redirect(`/kitchen/${req.session.user._id}`)
        })
      }
  
      req.session.save(() => {
        res.render('myRecipes', {
          currentPage: 'myRecipes',
          recipes
        })
      })
  
  
    } catch (e) {
      res.render("404", { currentPage: "404" });
      console.log(e);
    }
  }

}

export default new KitchenController()

