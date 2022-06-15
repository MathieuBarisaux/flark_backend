const mongoose = require("mongoose");

const Note = mongoose.model("Note", {
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Note;
