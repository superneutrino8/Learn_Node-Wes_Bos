exports.myMiddleware = (req, res, next) => {
  req.name = "Wes";
  next();
};

exports.homePage = (req, res) => {
  res.render("home", {
    name: req.name,
  });
};
