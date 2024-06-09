const Post = require("../models/PostsModel");

exports.kitchen = (req, res) => {
  res.render("kitchen", { currentPage: "kitchen" });
};

exports.submit = async (req, res) => {
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
};

exports.myRecipes = async (req, res) => {
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
};