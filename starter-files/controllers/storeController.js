const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith("image/");
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: `That filetype isn't allowed` }, false);
        }
    },
};

exports.homePage = (req, res) => {
    console.log(req.name);
    res.render("index");
};

exports.addStore = (req, res) => {
    res.render("editStore", { title: "Add Store" });
};

exports.upload = multer(multerOptions).single("photo");

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extention = req.file.mimetype.split("/")[1];
    req.body.photo = `${uuid.v4()}.${extention}`;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
};

exports.createStore = async (req, res) => {
    req.body.author = req.user._id;
    const store = await new Store(req.body).save();
    req.flash("success", `Successfully created ${store.name}.`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    const stores = await Store.find();
    res.render("stores", { title: "Stores", stores });
};

const confirmOwner = (store, user) => {
    if (!store.author.equals(user._id)) {
        throw Error("You must be owner in order to edit store!");
    }
};

exports.editStore = async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id });
    confirmOwner(store, req.user);
    res.render("editStore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    req.body.location.type = "Point";
    const store = await Store.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    ).exec();
    req.flash(
        "success",
        `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}/">View Store</a>`
    );
    res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
    const store = await (
        await Store.findOne({ slug: req.params.slug })
    ).populate("author");
    if (!store) return next();
    res.render("store", { store, title: store.name });
};

exports.getStoreByTags = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Store.getTagList();
    const storePromise = Store.find({ tags: tagQuery });
    const [tags, stores] = await Promise.all([tagsPromise, storePromise]);

    res.render("tags", { tags, title: "Tags", tag, stores });
};
