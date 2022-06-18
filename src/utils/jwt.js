const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sign = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY).user;
  } catch (error) {
    throw error;
  }
};
