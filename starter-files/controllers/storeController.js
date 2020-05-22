exports.homePage = (req, res) => {
    res.render("home", {
        name: "Wes",
        title: "Wes",
    });
};

exports.addStorePage = (req, res) => {
    res.render("editStore", {
        name: "Wes",
        title: "Add Store",
    });
};

exports.createStore = (req, res) => {
    res.json(req.body);
};
