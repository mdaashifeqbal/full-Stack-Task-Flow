const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.user_Token;

  if (!token)
    return res.status(401).json({
      message: "something went wrong login again please",
      success: false,
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("error while validate token",err.message);
    return res.status(401).json({
      message: "something went wrong login again please",
      success: false,
    });
  }
};
