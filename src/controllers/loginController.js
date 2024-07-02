import { Login } from "../models/LoginModel";

class LoginController {
  index(req, res){
    res.render("login", {
      currentPage: "login"
    });
  }

  async store(req, res) { 
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.status(400).json({error: true})
      });
      return;
    }

    req.session.user = login.user;
    req.session.save(() => {
      return res.status(200).json({ userId: req.session.user._id });
    });
  } catch (err) {
    res.render("404", { currentPage: "404" });
    console.log(err);
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
}

export default new LoginController();