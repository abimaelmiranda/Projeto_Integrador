import UserModel from"../models/UserModel";
import { Post, PostModel } from "../models/PostsModel";

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

  async show(req, res){
    try {
      if(!req.query.post) res.render("404", { currentPage: "404" });
      const post = await PostModel.findById(req.query.post);
      if (!post) throw new Error;

      const ingredients = JSON.parse(post.ingredientsArray[0]);

      res.render("recipe", { currentPage: "recipe", ingredients, post });
    } catch (error) {
      console.log(error);
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
      const unsave = new UserModel(req.body, req);
      await unsave.unSaveRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json({ message: "Receita removida com sucesso" });
    } catch (error) {
      console.log(error);
    }
  }

  async upvote(req, res) {
    try {
      await Post.upvote(req.body.recipeID, req.session.user._id);
      await UserModel.upvote(req.body.recipeID, req.session.user._id);
      res.status(200).json(
        { message: "Upvote salvo com sucesso"}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async unUpvote(req, res) {
    try {
      await Post.unUpvote(req.body.recipeID, req.session.user._id);
      await UserModel.unUpvoteRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json(
        { message: "Upvote removido com sucesso"}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async downvote(req, res) {
    try {
      await Post.downvote(req.body.recipeID, req.session.user._id);
      await UserModel.downvote(req.body.recipeID, req.session.user._id);
      res.status(200).json(
        { message: "downvote salvo com sucesso"}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async unDownvote(req, res) {
    try {
      await Post.unDownvote(req.body.recipeID, req.session.user._id);
      await UserModel.unDownvoteRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json(
        { message: "downvote removido com sucesso"}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getRecipeDetails(req, res) {
    try {
      const recipeDetais = await UserModel.getDetails(req.session.user._id);
      res.status(200).json(recipeDetais);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RecipeController();