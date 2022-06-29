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
const Category = require("../models/Category");
const Todo = require("../models/Todo");
const Note = require("../models/Note");

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
    const { email, pseudo, newsletter } = req.fields;
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

    if (newsletter) {
      user.newsletter = newsletter;
    }

    if (pseudo) {
      user.pseudo = pseudo;
    }

    await user.save();

    const userInformations = {
      pseudo: user.pseudo,
      avatar: user.avatar,
      email: user.email,
      newsletter: user.newsletter,
    };

    res.status(200).json(userInformations);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Update password **
router.put("/users/update-password", isAuthentificated, async (req, res) => {
  try {
    const user = req.user;
    const { password, newPassword } = req.fields;

    if (password && newPassword) {
      if (SHA256(password + user.salt).toString(encBase64) === user.hash) {
        const salt = uid2(64);
        const hash = SHA256(newPassword + salt).toString(encBase64);
        const token = uid2(64);

        const userToChangePassword = await User.findById(user._id);

        userToChangePassword.salt = salt;
        userToChangePassword.hash = hash;
        userToChangePassword.token = token;

        await userToChangePassword.save();

        res.status(200).json({ token: token });
      } else {
        res
          .status(400)
          .json({ message: "Your current password is not correct." });
      }
    } else {
      res
        .status(400)
        .json({ message: "We need more elements to update your password." });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete user account **
router.delete("/users/delete", isAuthentificated, async (req, res) => {
  try {
    const user = req.user;

    await Category.deleteMany({ user: user._id });
    await Todo.deleteMany({ user: user._id });
    await Note.deleteMany({ user: user._id });
    await User.findByIdAndDelete(user._id);

    res.status(200).json({ message: "Your account has been deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
