const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

// ** Read Road **
router.get("/todo/read", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(message.error);
  }
});

// ** Create road **
router.post("/todo/create", async (req, res) => {
  try {
    const { content, urgent, important, categories } = req.fields;

    const newTodo = await new Todo({
      content: content,
      date: new Date(),
    });

    if (urgent) {
      newTodo.urgent = urgent;
    }

    if (important) {
      newTodo.important = important;
    }

    const responses = await newTodo.save();

    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Update Road **
router.put("/todo/update", async (req, res) => {
  try {
    const { todoID, content, achivement, urgent, important } = req.fields;

    const findTodo = await Todo.findById(todoID);

    if (content) {
      findTodo.content = content;
    }

    if (achivement) {
      findTodo.achivement = achivement;
    }

    if (urgent) {
      findTodo.urgent = urgent;
    }

    if (important) {
      findTodo.important = important;
    }

    const responses = await findTodo.save();

    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete Road *
router.delete("/todo/delete", async (req, res) => {
  try {
    const { todoId } = req.fields;

    await Todo.findByIdAndRemove(todoId);

    res.status(200).json({ message: "Your todo has been deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
