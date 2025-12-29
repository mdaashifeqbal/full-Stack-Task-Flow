const userModel = require("../../models/user-model");
const notesModel = require("../../models/notes-model");
const { isLoggedIn } = require("../../middlewares/isLoggedIn");

//create note route
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


//get note route
module.exports.getNotes=async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId }).populate("notes");
    if (!user) {
      return res.status(404).json({
        message: "No new flow to show",
        success: false,
        notes: null,
      });
    }

    res.status(200).json({
      message: "data received successfully",
      success: true,
      notes: user.notes,
    });
  } catch (err) {
    console.log("error while sending notes", err.message);
    res
      .status(500)
      .json({ message: "internal server error", success: false, notes: null });
  }
}

//get specific note route
module.exports.specificNote=async (req, res) => {
  const id = req.params.noteId;
  try {
    const note = await notesModel.findById( id );

    if (!note)
      return res
        .status(404)
        .json({ message: "Note not found", success: false, note: null });

    res
      .status(200)
      .json({
        message: "Note fetched successfully",
        success: true,
        note: note,
      });
  } catch (err) {
    console.log("error while sending a specific note", err.message);
    res
      .status(500)
      .json({ message: "internal server error", success: false, note: null });
  }
}

//update note route
module.exports.updateNote=async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;
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

    // Update note
    await notesModel.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true, runValidators: true }
    );

    //Success response
    res.status(200).json({
      message: "Note updated successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error while updating note:", err.message);
    res.status(500).json({
      message: "Internal server error. Please try again.",
      success: false,
    });
  }
}

//delete note route
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
