const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");
const Category = require("../models/Category");

// ** Read Road **
router.get("/todo/read", async (req, res) => {
  try {
    const todos = await Todo.find().populate("categories");

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(message.error);
  }
});

// ** Create road **
router.post("/todo/create", async (req, res) => {
  try {
    const { content, urgent, important, categories, deadline } = req.fields;

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

    if (deadline) {
      newTodo.deadline = deadline;
    }

    if (categories) {
      newTodo.categories = categories;

      const findCategoryToPush = await Category.findById(categories);

      findCategoryToPush.number_of_todo += 1;

      await findCategoryToPush.save();
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
    const { todoID } = req.query;

    const todoToDelete = await Todo.findByIdAndRemove(todoID);

    const findCategoryToPush = await Category.findById(todoToDelete.categories);

    findCategoryToPush.number_of_todo--;

    await findCategoryToPush.save();

    res.status(200).json({ message: "Your todo has been deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
