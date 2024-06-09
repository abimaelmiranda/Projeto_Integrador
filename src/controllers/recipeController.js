const UserModel = require("../models/UserModel");

exports.save = async (req, res) => {
  try {
    const save = new UserModel(req.body);
    await save.saveRecipe(req.body.recipeID, req.session.user._id);
    res.status(200).json(
      { message: "Receita salva com sucesso"}
    );
  } catch (error) {
    console.log(error);
  }
};

exports.unsave = async (req, res) => {
    try {
      const unsave = new UserModel(req.body);
      await unsave.unSaveRecipe(req.body.recipeID, req.session.user._id);
      res.status(200).json({ message: "Receita removida com sucesso" });
    } catch (error) {
      console.log(error);
    }
}

exports.getSavedRecipes = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const savedRecipes = await user.getSavedRecipes(req.session.user._id);
    res.status(200).json( { savedRecipes });
  } catch (error) {
    console.log(error);
  }
}