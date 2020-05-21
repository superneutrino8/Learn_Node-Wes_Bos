const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Do work here
router.get("/", (req, res) => {
  res.send("Hey! It works!");
});

router.get("/home/", storeController.homePage);
router.get("/add/", storeController.addStorePage);
router.post("/add/", storeController.createStore);

module.exports = router;
