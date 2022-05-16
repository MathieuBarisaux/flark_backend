const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  category_name: String,
  category_color: String,
  number_of_todo: {
    type: Number,
    default: 0,
  },
  category_icon: String,
});

module.exports = Category;
