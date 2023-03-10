const { validationResult } = require("express-validator");

function validateResult(req, res, next) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

module.exports = { validateResult };
