const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  savedRecipes: { type: [mongoose.Schema.Types.ObjectId], ref: "posts" },
});

const UserModel = mongoose.model("users", UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    // const salt = bcrypt.genSaltSync();
    this.body.password = await bcrypt.hash(this.body.password, 8);

    this.user = await UserModel.create(this.body);
  }

  async saveRecipe(recipeId, userId) {
    const user = await UserModel.findById(userId);
  
    if (user.savedRecipes.includes(recipeId)) {
      await this.unSaveRecipe(recipeId, userId);
      return
    } else {
      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { savedRecipes: recipeId } },
        { new: true }
      );
    }
  }

  async unSaveRecipe(recipeId, userId) {
    const user = await UserModel.findById(userId);
    if (user.savedRecipes.includes(recipeId)) {
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { savedRecipes: recipeId } },
        { new: true }
      );
      return
    }
      return
  }

  async getSavedRecipes(userId) {
    try {

      await this.userExists();
  
      const user = await UserModel.findById(userId);
      const recipeIds = user.savedRecipes.map(recipe => String(recipe));
  
      return recipeIds;
    } catch (error) {
      throw error;
    }
  }

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      return this.errors.push("E-mail Inválido");
    }

    if (this.body.password.length < 8 || this.body.password.length > 20) {
      return this.errors.push("A senha deve ter entre 8 a 20 caracteres");
    }

    if (!this.passValidate(this.body.password)) {
      return this.errors.push("A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.");
    }
  }

  cleanUp() {
    if (!this.userId) this.userId = "";

    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      username: this.body.username,
      email: this.body.email,
      password: this.body.password,
    };
  }

  async userExists() {
    const checkUsername = await UserModel.findOne({
      username: this.body.username,
    });
    const checkEmail = await UserModel.findOne({ email: this.body.email });

    if (checkEmail || checkUsername) this.errors.push("Usuário já existente");
  }

  passValidate(pass) {
    return (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!*$?#])[\S]{8,20}$/g.test(pass)
    );
  }
}

module.exports = User;
