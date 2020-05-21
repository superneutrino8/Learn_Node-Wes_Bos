const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const slug = require("slugs");

const storeSchemna = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please Enter Store Name!",
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

storeSchemna.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); //Skip it if no modiciation
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Store", storeSchemna);
