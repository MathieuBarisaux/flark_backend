const mongoose = require("mongoose");

const User = mongoose.model("User", {
  pseudo: String,
  avatar: Object,
  email: {
    required: true,
    unique: true,
    type: email,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
