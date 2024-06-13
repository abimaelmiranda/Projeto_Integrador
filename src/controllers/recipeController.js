import UserModel from"../models/UserModel";
import Post from "../models/PostsModel";

class RecipeController {

  async store(req, res){
    try {
      const post = new Post(req.body, req);

      await post.postSubmit();
      
      if (post.errors.length > 0) {
        req.flash("errors", post.errors);
        req.session.save(() => {
        return res.redirect(`/kitchen/${req.session.user._id}`);
        });
        return;
      }
      req.flash("success", 'Receita publicada!');
      req.session.save(() => {
        return res.redirect(`/kitchen/${req.session.user._id}`);
      });
  
    } catch (e) {
      res.render("404", { currentPage: "404" });
      console.log(e);
    }  
  }

  async save(req, res) {
    try {
      const save = new UserModel(req.body);
      await save.saveRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json(
        { message: "Receita salva com sucesso"}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async unsave(req, res) {
    try {
      const unsave = new UserModel(req.body);
      await unsave.unSaveRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json({ message: "Receita removida com sucesso" });
    } catch (error) {
      console.log(error);
    }
  }

  async getSavedRecipes(req, res) {
    try {
      const user = new UserModel(req.body);
      const savedRecipes = await user.getSavedRecipes(req.session.user._id);
      res.status(200).json( { savedRecipes });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RecipeController();