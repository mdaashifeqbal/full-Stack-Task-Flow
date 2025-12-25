const userModel = require("../../models/user-model");
const notesModel = require("../../models/notes-model");
const { isLoggedIn } = require("../../middlewares/isLoggedIn");

//create note controlls
module.exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim())
    return res
      .status(400)
      .json({ message: "Title and content are required", success: false });
  try {
    const newNote = new notesModel({
      user: req.user._id,
      title,
      content,
    });

    await newNote.save();

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: { notes: newNote._id },
    });

    res
      .status(201)
      .json({ message: "Note created successfully", success: true });
  } catch (err) {
    console.log("error while creating note ", err.message);
    res.status(500).json({
      message: "Internal server error try again please",
      success: false,
    });
  }
};

//delete note controlls
module.exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    // Find note
    const note = await notesModel.findById(noteId);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        success: false,
      });
    }

    // Ownership check (CRITICAL)
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this note",
        success: false,
      });
    }

    // Delete note
    await notesModel.findByIdAndDelete(noteId);

    // Remove note reference from user
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { notes: noteId },
    });

    //Success response

    res.status(200).json({
      message: "Note deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error while deleting note:", err.message);
    res.status(500).json({
      message: "Internal server error. Please try again.",
      success: false,
    });
  }
};
