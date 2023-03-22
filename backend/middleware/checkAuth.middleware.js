const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { handleServerError } = require("./serverError");

function checkAuth(req, res, next) {
  try {
    // Get the token
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.secretKey);
  } catch (error) {
    return handleServerError(res, error);
  }
  next();
}

module.exports = { checkAuth };
