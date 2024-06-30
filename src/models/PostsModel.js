const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  recipeTitle: { type: String, required: true },
  shortDescription: { type: String, required: true },
  ingredientsArray: { type: [String], required: true },
  preparationMethod: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  upvotedBy: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
  downvotedBy: { type: [mongoose.Schema.Types.ObjectId], ref: "users" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  recipeImage: { type: String },
  createdIn: { type: Date, default: Date.now() },
});

const PostModel = mongoose.model("post", PostsSchema);

class Post {
  constructor(body, req) {
    this.body = body;
    this.author = req.session.user._id;
    this.recipeImage = req.file.filename;
    this.errors = [];
    this.post = null;
  }

  async postSubmit() {
    this.validate();
    if (this.errors.length > 0) return;

    this.post = await PostModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    // if (!this.validateArrayOfStrings(this.body.ingredientsArray)) {
    //   this.errors.push('Erro! Verifique se os ingredientes foram adicionados corretamente separados por linha!');
    // }

    if (this.body.recipeTitle.length < 3) {
      this.errors.push("Título inválido!");
    }

    if (this.body.shortDescription.length < 3) {
      this.errors.push("Descrição inválida!");
    }

    if (this.body.preparationMethod.length < 3) {
      this.errors.push("Modo de preparo inválido!");
    }

    if (this.errors.length > 0) {
      return;
    }
  }

  validateArrayOfStrings(value) {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.every((item) => typeof item === "string");
  }

  async searchMyRecipes() {
    const author = await PostModel.find({ author: this.author }).sort({
      createdIn: -1,
    });

    if (!author) return this.errors.push("Nenhuma receita encontrada");

    return author;
  }

  static async postSearch(query, page = 1, limit = 10) {
    try {
      const posts = await PostModel.find({ recipeTitle: new RegExp(query, 'i')})
      .sort({ createdIn: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
      if (!posts) return this.errors.push("Nenhum post encontrado");
      return posts;
    } catch (err) {
      console.log(err);
    }
  }

  static async homeSearch() {
    try {
      const posts = await PostModel.find().sort({ createdIn: -1 });
      if (!posts) return this.errors.push("Nenhum post encontrado");
      return posts;
    } catch (e) {
      console.log(e);
    }
  }

  static async upvote(recipeId, userId) {
    try {
      const post = await PostModel.findById(recipeId);

      if (!post) return this.errors.push("Nenhum post encontrado");

      if(post.upvotedBy.includes(userId)) {
        await this.unUpvote(recipeId, userId);
        return;
      }

      const postUpdated = await PostModel.findByIdAndUpdate(
        recipeId,
        { 
          $inc: { upvotes: 1 },
          $push: { upvotedBy: userId } 
        },
        { new: true }
      );
      return postUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async unUpvote(recipeId, userId) {
    try {
      const post = await PostModel.findById(recipeId);

      if (!post) return this.errors.push("Nenhum post encontrado");

      if(post.upvotedBy.includes(userId)) {
        const postUpdated = await PostModel.findByIdAndUpdate(
          recipeId,
          { 
            $inc: { upvotes: -1 },
            $pull: { upvotedBy: userId } 
          },
          { new: true }
        );
        return postUpdated;
      }
      return
    } catch (error) {
      console.log(error);
    }
  }

  static async downvote(recipeId, userId) {
    try {
      const post = await PostModel.findById(recipeId);

      if (!post) return this.errors.push("Nenhum post encontrado");

      if(post.downvotedBy.includes(userId)) {
        await this.unDownvote(recipeId, userId);
        return;
      }

      const postUpdated = await PostModel.findByIdAndUpdate(
        recipeId,
        { 
          $inc: { downvotes: 1 },
          $push: { downvotedBy: userId } 
        },
        { new: true }
      );
      return postUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async unDownvote(recipeId, userId) {
    try {
      const post = await PostModel.findById(recipeId);

      if (!post) return this.errors.push("Nenhum post encontrado");

      if(post.downvotedBy.includes(userId)) {
        const postUpdated = await PostModel.findByIdAndUpdate(
          recipeId,
          { 
            $inc: { downvotes: -1 },
            $pull: { downvotedBy: userId } 
          },
          { new: true }
        );
        return postUpdated;
      }
      return
    } catch (error) {
      console.log(error);
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      recipeTitle: this.body.recipeTitle,
      shortDescription: this.body.shortDescription,
      ingredientsArray: this.body.ingredientsArray,
      preparationMethod: this.body.preparationMethod,
      author: this.author,
      recipeImage: this.recipeImage,
      createdIn: this.body.createdIn,
    };
  }
}

module.exports = Post;

