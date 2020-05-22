const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Do work here
router.get("/", (req, res) => {
    res.send("Hey! It works!");
});

// console.log("Dir: " + __dirname);
// console.log("File: " + __filename);

router.get("/home/", storeController.homePage);
router.get("/add/", storeController.addStorePage);
router.post("/add/", storeController.createStore);

module.exports = router;
