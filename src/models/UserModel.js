import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  upvotedRecipes: { type: [mongoose.Schema.Types.ObjectId], ref: "post" },
  downvotedRecipes: { type: [mongoose.Schema.Types.ObjectId], ref: "post" },
  savedRecipes: { type: [mongoose.Schema.Types.ObjectId], ref: "post" },
});

export const UserModel = mongoose.model("users", UserSchema);

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

  static async upvote(recipeId, userId) {
    const user = await UserModel.findById(userId);
  
    if (user.upvotedRecipes.includes(recipeId)) {
      await this.unUpvoteRecipe(recipeId, userId);
      return
    } else {
      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { upvotedRecipes: recipeId } },
        { new: true }
      );
    }
  }

  static async downvote(recipeId, userId) {
    const user = await UserModel.findById(userId);
  
    if (user.downvotedRecipes.includes(recipeId)) {
      await this.unDownvoteRecipe(recipeId, userId);
      return
    } else {
      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { downvotedRecipes: recipeId } },
        { new: true }
      );
    }
  }

  static async unDownvoteRecipe(recipeId, userId) {
    const user = await UserModel.findById(userId);
    if (user.downvotedRecipes.includes(recipeId)) {
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { downvotedRecipes: recipeId } },
        { new: true }
      );
      return
    }
      return
  }

  static async unUpvoteRecipe(recipeId, userId) {
    const user = await UserModel.findById(userId);
    if (user.upvotedRecipes.includes(recipeId)) {
      await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { upvotedRecipes: recipeId } },
        { new: true }
      );
      return
    }
      return
  }

  static async getDetails(userId) {
    try {

      const user = await UserModel.findById(userId);

      const upvoted = user.upvotedRecipes.map(recipe => String(recipe)); 
      const downvoted = user.downvotedRecipes.map(recipe => String(recipe));
      const savedRecipes = user.savedRecipes.map(recipe => String(recipe));

      return { upvoted, downvoted, savedRecipes } 
    } catch (error) {
      console.log(error);
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
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&(),.?":{}|<>])[a-zA-Z\d!@#$%^&(),.?":{}|<>]{8,20}$/g.test(pass)
    );
  }
}

export default User;
