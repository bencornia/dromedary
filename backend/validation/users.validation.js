const { body } = require("express-validator");

const createUserValidator = [
  body("businessName").not().isEmpty().trim(),
  body("profileImagePath").not().isEmpty().trim(),
  body("ownerName").not().isEmpty().trim(),
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty().trim().isLength({ min: 5 }),
  body("apiKey").not().isEmpty().trim(),
];

module.exports = { createUserValidator };
