const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
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

router.get("/store/:slug", catchErrors(storeController.getStoreBySlug));

router.get("/tags/", catchErrors(storeController.getStoreByTags));
router.get("/tags/:tag", catchErrors(storeController.getStoreByTags));

router.get("/login", userController.loginUser);

router.get("/register", userController.registerUser);
router.post(
    "/register",
    userController.validateUser,
    catchErrors(userController.register)
);

module.exports = router;
