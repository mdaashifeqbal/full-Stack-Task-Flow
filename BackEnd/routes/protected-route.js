const express = require("express");

const router = express.Router();

const userModel = require("../models/user-model");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/me", isLoggedIn, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

module.exports=router;