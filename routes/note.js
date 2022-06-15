const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

const isAuthentificated = require("../Middleware/isAuthentificated");

// ** Create note **
router.post("/note/create", isAuthentificated, async (req, res) => {
  try {
    const { content } = req.fields;
    const user = req.user;

    const newNote = await new Note({
      user: user._id,
      content: content,
    });

    await newNote.save();

    res.status(200).json(newNote);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Read user notes **
router.get("/note/read-all", isAuthentificated, async (req, res) => {
  try {
    const user = req.user;

    const allNotes = await Note.find({ user: user._id });

    res.status(200).json(allNotes);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// ** Delete one note **
router.delete("/note/delete-one", isAuthentificated, async (req, res) => {
  try {
    const { noteId } = req.query;
    const user = req.user;

    const noteToDelete = await Note.findById(noteId);

    if (noteToDelete.user.toString() === user._id.toString()) {
      await Note.findByIdAndDelete(noteId);

      res.status(200).json({ message: "Your note has been deleted" });
    } else {
      res.status(400).json({ message: "Unauthorized" });
    }

    console.log(noteId);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
