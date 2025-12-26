const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogin,
  me,
  logout,
} = require("../controllers/userControllers/user-auth");

const { isLoggedIn } = require("../middlewares/isLoggedIn");
router.get("/", (req, res) => {
  res.send("user route working fine baby");
});

//new user register route
router.post("/register", userRegister);

//existing user login route
router.post("/login", userLogin);

//get user details route
router.get("/me", isLoggedIn, me);

//user logout route
router.post("/logout", logout);

module.exports = router;
