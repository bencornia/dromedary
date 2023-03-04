const bcrypt = require("bcrypt");

const { User } = require("../models/users.model");
const { validationResult } = require("express-validator");

async function getUser(req, res) {
  res.send({ message: "got a user" });
}

async function postUser(req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    return res.status(400).json({ errors: errors.array() });
  }

  // Hash password
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  // Hash apikey
  let apiKey = "";
  if (req.body.apiKey) {
    apiKey = await bcrypt.hash(req.body.apiKey, 10);
  }

  try {
    const document = {
      businessName: req.body.businessName,
      ownerName: req.body.ownerName,
      email: req.body.email,
      password: encryptedPassword,
      apiKey: apiKey,
      profileImagePath: "",
      authToken: "",
      createdDate: new Date().toISOString(),
      lastUpdatedDate: new Date().toISOString(),
    };

    const user = await User.create(document);

    return res.status(201).json({ id: user._id });
  } catch (error) {
    // Document Creation failed
    return res.status(500).send({ message: error });
  }
}

async function putUser(req, res) {
  res.send({ message: "updated a user" });
}

async function deleteUser(req, res) {
  res.send({ message: "deleted a user" });
}

module.exports = { getUser, postUser, putUser, deleteUser };
