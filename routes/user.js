const express = require("express");
const router = express.Router();

// ** Dependancies **
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// ** Model **
const User = require("../models/User");

// ** Sign Up road **
router.post("/users/signup", async (req, res) => {
  try {
    const { name, password, email } = req.fields;

    const checkEmail = await User.findOne({ email: email });

    if (!checkEmail) {
      const salt = uid2(64);
      const hash = SHA256(password + salt);
      const token = uid2(64);

      const newUser = await new User({
        pseudo: name,
        email: email,
        salt: salt,
        hash: hash,
        token: token,
      });

      const createdResponse = await newUser.save();

      res.status(200).json({
        id: createdResponse._id,
        token: createdResponse.token,
        pseudo: createdResponse.pseudo,
      });
    } else {
      res.status(409).json({ message: "This email already use" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
