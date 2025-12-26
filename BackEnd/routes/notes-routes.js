const express = require("express");

const router = express.Router();

const userModel = require("../models/user-model");
const notesModel = require("../models/notes-model");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const {
  createNote,
  getNotes,
  specificNote,
  deleteNote,
} = require("../controllers/notesControllers/notes-contolls");

router.get("/", (req, res) => {
  res.send("notes api working properly");
});

//create new note route
router.post("/create-note", isLoggedIn, createNote);

//delete note route
router.delete("/delete-note/:noteId", isLoggedIn, deleteNote);

//get note data route
router.get("/get-notes", isLoggedIn, getNotes);

//get specific note
router.get("/get-one-note/:noteId", isLoggedIn,specificNote );
module.exports = router;
