const { validationResult } = require("express-validator");
const { deleteImage } = require("../helpers/deleteImage.helper");

function validateResult(req, res, next) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    deleteImage(req.body.imagePath);
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

module.exports = { validateResult };
