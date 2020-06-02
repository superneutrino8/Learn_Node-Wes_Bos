const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", storeController.getStores);
router.get("/stores", storeController.getStores);
router.get("/add", storeController.addStore);
router.get("/stores/:id/edit/", catchErrors(storeController.editStore));
router.post(
    "/add",
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore)
);
router.post(
    "/add/:id/",
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore)
);

module.exports = router;
