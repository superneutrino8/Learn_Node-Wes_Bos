const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passpoerLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid Email Address"],
        required: "Please supply an Email Address",
    },
    name: {
        type: String,
        required: "Please supply a name",
        trim: true,
    },
});

userSchema.plugin(passpoerLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
