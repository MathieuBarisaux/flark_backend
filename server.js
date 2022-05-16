const dotenv = require("dotenv").config();

const express = require("express");
const app = express();

// ** MiddleWare **
const expressFormidable = require("express-formidable");
app.use(expressFormidable());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// ** Roads **
const todoRoad = require("./routes/todo");
app.use(todoRoad);
const categoryRoad = require("./routes/category");
app.use(categoryRoad);

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
