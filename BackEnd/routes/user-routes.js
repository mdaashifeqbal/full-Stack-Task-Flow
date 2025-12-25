const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogin,
} = require("../controllers/userControllers/user-auth");

router.get("/", (req, res) => {
  res.send("user route working fine baby");
});

//new user register route
router.post("/register", userRegister);

//existing user login route
router.post("/login", userLogin);

//user logout route
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("user_Token", {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
