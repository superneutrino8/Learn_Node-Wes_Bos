exports.homePage = (req, res) => {
  res.render("home", {
    name: "Wes",
    title: "Wes",
  });
};
