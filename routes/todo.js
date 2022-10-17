const express = require("express");
const router = express.Router();

const isAuthenticated = require("../Middleware/isAuthentificated");

const Todo = require("../models/Todo");
const Category = require("../models/Category");

// ** Read Road **
router.get("/todo/read", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const todos = await Todo.find({ user: user._id }).populate("categories");

    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(message.error);
  }
});

// ** Create road **
router.post("/todo/create", isAuthenticated, async (req, res) => {
  try {
    const { content, urgent, important, categories, deadline } = req.fields;
    const user = req.user;

    const newTodo = await new Todo({
      content: content,
      user: user._id,
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

    if (categories !== "uncategorized") {
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
router.put("/todo/update", isAuthenticated, async (req, res) => {
  try {
    const { todoID, content, achivement, urgent, important } = req.fields;
    const user = req.user;

    const findTodo = Todo.findById(todoID);

    if (findTodo.user.toString() === user._id.toString()) {
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
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete Road *
router.delete("/todo/delete", isAuthenticated, async (req, res) => {
  try {
    const { todoID } = req.query;
    const user = req.user;

    const todoToDelete = await Todo.findById(todoID);

    if (todoToDelete.user.toString() === user._id.toString()) {
      await Todo.findByIdAndDelete(todoID);

      if (todoToDelete.categories) {
        const findCategoryToPush = await Category.findById(
          todoToDelete.categories
        );

        findCategoryToPush.number_of_todo--;

        await findCategoryToPush.save();
      }

      res.status(200).json({ message: "Your todo has been deleted" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
