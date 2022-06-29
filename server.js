const dotenv = require("dotenv").config();

const express = require("express");
const app = express();

// ** MiddleWare **
const expressFormidable = require("express-formidable");
app.use(expressFormidable());

// ** Cors **
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// ** Routes **
const todoRoute = require("./routes/todo");
app.use(todoRoute);

const categoryRoute = require("./routes/category");
app.use(categoryRoute);

const userRoute = require("./routes/user");
app.use(userRoute);

const noteRoute = require("./routes/note");
app.use(noteRoute);

const contactRoute = require("./routes/contact");
app.use(contactRoute);

// ** 404 Not Found **
app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "404 Not Found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/*****************************/
app.listen(process.env.PORT, () => {
  console.log("Server on the moon");
});
