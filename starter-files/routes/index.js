const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", storeController.getStores);
router.get("/stores", storeController.getStores);
router.get("/add", authController.isLoggedIn, storeController.addStore);
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
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/register", userController.registerUser);
router.post(
    "/register",
    userController.validateUser,
    catchErrors(userController.register),
    authController.login
);

router.get("/account", authController.isLoggedIn, userController.account);
router.post("/account", catchErrors(userController.updateUser));

router.post("/account/forgot", catchErrors(authController.forgot));

router.get("/account/reset/:token", catchErrors(authController.resetPassword));

module.exports = router;
