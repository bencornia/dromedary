const bcrypt = require("bcrypt");
const { handleServerError } = require("./serverError");

async function encryptPassword(req, res, next) {
  // Hash password
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return handleServerError(res, error);
  }

  next();
}

async function encryptApiKey(req, res, next) {
  if (!req.body.apiKey) {
    next();
    return;
  }

  // Hash apikey
  try {
    req.body.apiKey = await bcrypt.hash(req.body.apiKey, 10);
  } catch (error) {
    return handleServerError(res, error);
  }

  next();
}

module.exports = { encryptPassword, encryptApiKey };
