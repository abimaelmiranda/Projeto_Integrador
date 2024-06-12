const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  recipeTitle: { type: String, required: true },
  shortDescription: { type: String, required: true },
  ingredientsArray: { type: [String], required: true },
  preparationMethod: { type: String, required: true },
  createdIn: { type: Date, default: Date.now() },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const PostModel = mongoose.model("post", PostsSchema);

class Post {
  constructor(body, req) {
    this.body = body.data;
    this.author = req.session.user._id;
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

  static async homeSearch() {
    try {
      const posts = await PostModel.find().sort({ createdIn: -1 });
      if (!posts) return this.errors.push("Nenhum post encontrado");
      return posts;
    } catch (e) {
      console.log(e);
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
      createdIn: this.body.createdIn,
      imagePath: this.body.imagePath
    };
  }
}

module.exports = Post;

