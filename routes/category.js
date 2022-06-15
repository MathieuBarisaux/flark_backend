const express = require("express");
const { get } = require("express/lib/response");
const router = express.Router();

const Category = require("../models/Category");
const Todo = require("../models/Todo");

// ** Check category road **
router.get("/category/read", async (req, res) => {
  try {
    const findCategory = await Category.find();

    res.status(200).json(findCategory);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Create category road **
router.post("/category/create", async (req, res) => {
  try {
    const { category_name, category_color, category_icon } = req.fields;

    const newCategory = await new Category({
      category_name: category_name,
      category_color: category_color,
      category_icon: category_icon,
    });

    const response = await newCategory.save();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Update cateogry road **
router.put("/category/update", async (req, res) => {
  try {
    const { category_id, category_name, category_icon, category_color } =
      req.fields;

    if (category_id) {
      const findCategory = await Category.findById(category_id);

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
      res.status(400).json({ Error: "We need ID to update" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete category road **
router.delete("/category/delete", async (req, res) => {
  try {
    const { category_id } = req.query;

    const cat = await Category.findByIdAndDelete(category_id);

    const allTodosInCat = await Todo.deleteMany({ categories: category_id });

    res.status(200).json({ message: "Your category has been deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
