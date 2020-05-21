const express = require("express");
const router = express.Router();

// Do work here
router.get("/", (req, res) => {
  res.send("Hey! It works!");
});

router.get("/home/", (req, res) => {
  res.render("home", {
    name: req.query.name,
  });
});

module.exports = router;
