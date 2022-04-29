const mongoose = require("mongoose");

const Categorie = mongoose.model("Categorie", {
  categorie_name: String,
  color: String,
});

module.exports = Categorie;
