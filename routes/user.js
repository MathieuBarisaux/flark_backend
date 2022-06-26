const express = require("express");
const router = express.Router();

// ** Dependancies **
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const cloudinary = require("../tools/cloudinary");

// ** Middleware **
const isAuthentificated = require("../Middleware/isAuthentificated");

// ** Model **
const User = require("../models/User");

// ** Sign Up road **
router.post("/users/signup", async (req, res) => {
  try {
    const { pseudo, password, email } = req.fields;

    const checkEmail = await User.findOne({ email: email });

    if (!checkEmail) {
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = await new User({
        pseudo: pseudo,
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
        email: createdResponse.email,
      });
    } else {
      res.status(409).json({ message: "Sorry but this email is already use" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Sign In road **
router.post("/users/signin", async (req, res) => {
  try {
    const { email, password } = req.fields;

    const searchMailUser = await User.findOne({ email: email });

    if (searchMailUser) {
      const checkHash = SHA256(password + searchMailUser.salt).toString(
        encBase64
      );

      if (checkHash === searchMailUser.hash) {
        res.status(200).json({
          id: searchMailUser._id,
          token: searchMailUser.token,
          pseudo: searchMailUser.pseudo,
          avatar: searchMailUser.avatar,
          email: searchMailUser.email,
          newsletter: searchMailUser.newsletter,
        });
      } else {
        res
          .status(409)
          .json({ message: "Sorry but this mail or password is not exact" });
      }
    } else {
      res
        .status(409)
        .json({ message: "Sorry but this mail or password is not exact" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Update road **
router.put("/users/update", isAuthentificated, async (req, res) => {
  try {
    const { userPicture } = req.files;
    const { email, pseudo, password } = req.fields;
    const user = req.user;

    if (userPicture) {
      if (user.avatar) {
        await cloudinary.api.delete_resources_by_prefix(
          `/Flark/users/${user._id}`
        );
      }

      const uploadPicture = await cloudinary.uploader.upload(userPicture.path, {
        folder: `/Flark/users/${user._id}`,
        public_id: user._id,
      });

      user.avatar = uploadPicture.secure_url;
    }

    if (email) {
      user.email = email;
    }

    if (pseudo) {
      user.pseudo = pseudo;
    }

    if (password) {
      const newSalt = uid2(64);
      const newHash = SHA256(password + newSalt).toString(encBase64);
      const newToken = uid2(64);

      user.salt = newSalt;
      user.hash = newHash;
      user.token = newToken;
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Your profil has been update with success" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Read user informations **
router.get("/users/read", isAuthentificated, async (req, res) => {
  try {
    const user = req.user;

    const userInformations = {
      pseudo: user.pseudo,
      avatar: user.avatar,
      email: user.email,
    };

    res.status(200).json(userInformations);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
