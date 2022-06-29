const express = require("express");
const router = express.Router();

const isAuthentificated = require("../Middleware/isAuthentificated");

const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(FormData);
const client = mailgun.client({
  username: "Flark",
  key: process.env.API_KEY_MAILGUN,
});

// ** Contact route **
router.post("/contact", isAuthentificated, async (req, res) => {
  try {
    const user = req.user;
    const { userMessage, userObject } = req.fields;

    const messageData = {
      from: `${user.pseudo} <${user.email}>`,
      to: "mathieu.barisaux@gmail.com",
      subject: "FLARK :" + " " + userObject + " " + user.email,
      text: userMessage,
    };

    client.messages.create(process.env.DOMAIN_MAILGUN, messageData);

    res
      .status(200)
      .json({ message: "Your message has been send with success !" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
