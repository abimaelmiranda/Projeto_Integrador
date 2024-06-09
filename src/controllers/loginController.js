const Login = require("../models/LoginModel");

exports.submit = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login");
      });
      return;
    }

    req.session.user = login.user;
    req.session.save(() => {
      return res.status(200).json({ userId: login.user._id });
    });
  } catch (e) {
    res.render("404", { currentPage: "404" });
    console.log(e);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
