export const middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

export const checkCSRF = (err, req, res, next) => {
  if (err && "EBADCSRFTOKEN" === err.code) {
    res.render("404", { currentPage: "404" });
    return console.log("BAD CSRF");
  }
};

export const csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

export const loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Faça login para continuar");
    req.session.save(() =>{
      res.status(401).json({ error: "Faça login para continuar" });
    })
    return
  }
  next();
};

export const notFound = (req, res, next) => {
  res.status(404)
  .render("404", {
     currentPage: "404" 
    });
};
