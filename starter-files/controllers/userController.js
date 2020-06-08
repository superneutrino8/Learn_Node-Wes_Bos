const mongoose = require("mongoose");

exports.loginUser = (req, res) => {
    res.render("login", { title: "Log In" });
};

exports.registerUser = (req, res) => {
    res.render("register", { title: "Register" });
};
