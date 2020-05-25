const mongoose = require("mongoose");
const Store = mongoose.model("Store");

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
