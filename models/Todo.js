const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  achivement: {
    type: Boolean,
    default: false,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: false,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  deadline: Date,
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = Todo;
