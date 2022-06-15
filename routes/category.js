const express = require("express");
const { get } = require("express/lib/response");
const router = express.Router();

const isAuthenticated = require("../Middleware/isAuthentificated");

const Category = require("../models/Category");
const Todo = require("../models/Todo");

// ** Check category road **
router.get("/category/read", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;

    const findCategory = await Category.find({ user: user._id });

    res.status(200).json(findCategory);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Create category road **
router.post("/category/create", isAuthenticated, async (req, res) => {
  try {
    const { category_name, category_color, category_icon } = req.fields;
    const user = req.user;

    const newCategory = await new Category({
      category_name: category_name,
      category_color: category_color,
      category_icon: category_icon,
      user: user._id,
    });

    const response = await newCategory.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Update cateogry road **
router.put("/category/update", isAuthenticated, async (req, res) => {
  try {
    const { category_id, category_name, category_icon, category_color } =
      req.fields;

    const user = req.user;

    if (category_id) {
      const findCategory = await Category.findById(category_id);

      if (findCategory.user.toString() === user._id.toString()) {
        if (category_name) {
          findCategory.category_name = category_name;
        }
        if (category_icon) {
          findCategory.category_icon = category_icon;
        }
        if (category_color) {
          findCategory.category_color = category_color;
        }

        await findCategory.save();

        res.status(200).json({ OK: "Your category has been updated" });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ Error: "We need ID to update" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete category road **
router.delete("/category/delete", isAuthenticated, async (req, res) => {
  try {
    const { category_id } = req.query;
    const user = req.user;

    const categorieForDelete = await Category.findById(category_id);

    if (categorieForDelete.user.toString() === user._id.toString()) {
      await Category.findByIdAndDelete(category_id);

      const allTodosInCat = await Todo.deleteMany({ categories: category_id });

      res.status(200).json({ message: "Your category has been deleted" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
