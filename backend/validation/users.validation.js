const { body } = require("express-validator");

const createUserValidator = [
  body("businessName").not().isEmpty().trim().escape(),
  body("ownerName").not().isEmpty().trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").not().isEmpty().trim().isLength({ min: 8 }),
];

module.exports = { createUserValidator };
