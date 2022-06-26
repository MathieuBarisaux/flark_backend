const mongoose = require("mongoose");

const User = mongoose.model("User", {
  pseudo: String,
  avatar: Object,
  email: {
    required: true,
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  newsletter: Boolean,
});

module.exports = User;
