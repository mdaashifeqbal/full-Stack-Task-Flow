const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("jwt secret not defined");
}

module.exports.generateToken = (user) =>
  jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
