const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
  content: String,
  user: Object,
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
  date: Date,
  categories: Object,
});

module.exports = Todo;
