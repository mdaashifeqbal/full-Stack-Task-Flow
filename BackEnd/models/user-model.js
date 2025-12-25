const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        default: [],
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
