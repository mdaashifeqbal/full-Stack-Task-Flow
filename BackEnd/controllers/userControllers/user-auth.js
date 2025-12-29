const userModel = require("../../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generate-token");

//new user register route
module.exports.userRegister = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  if (!fullName || !userName || !email || !password)
    return res
      .status(400)
      .json({ message: "please fill all fields ", success: false });

  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist)
      return res
        .status(409)
        .json({ message: "user already registered", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(newUser);
    res.cookie("user_Token", token, {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
    console.log("error while creating user ", err.message);
    res.status(500).json({
      message: "Internal server error try again please",
      success: false,
    });
  }
};

//existing user login route
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!req.body.length < 0) {
    return res
      .status(400)
      .json({ message: "please fill valid credentails", success: false });
  }
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please fill valid credentails", success: false });
  }
  try {
    const isUserExist = await userModel.findOne({ email }).select("+password");
    if (!isUserExist)
      return res
        .status(404)
        .json({ message: "user not exist", success: false });

    const originalPassword = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!originalPassword) {
      return res
        .status(404)
        .json({ message: "invalid credentials", success: false });
    } else {
      const token = generateToken(isUserExist);
      res.cookie("user_Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Login Successful",
        success: true,
      });
    }
  } catch (err) {
    console.log("error from login user", err.message);
    res.status(500).json({
      message: "Internal server error try again please",
      success: false,
    });
  }
};

//send user details route
module.exports.me = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("userName email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//user logout route
module.exports.logout = (req, res) => {
  try {
    res.clearCookie("user_Token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
};
