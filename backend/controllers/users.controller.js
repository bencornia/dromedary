const { User } = require("../models/users.model");
const { validationResult } = require("express-validator");
const { handleServerError } = require("../middleware/serverError");

async function getUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({ error: "No users exist" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getUser(req, res) {
  // Check for valid object id
  let id = req.params.id;

  // Try making request
  try {
    const user = await User.findById(id);

    if (!user) {
      // User not found
      return res
        .status(404)
        .json({ message: `Resource with ID: [ ${id} ] not found.` });
    }

    // User found
    return res.status(200).json(user);
  } catch (error) {
    // Server error
    return handleServerError(res, error);
  }
}

async function postUser(req, res) {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const document = {
      businessName: req.body.businessName,
      ownerName: req.body.ownerName,
      email: req.body.email,
      password: req.body.password,
      apiKey: req.body.apiKey,
      profileImagePath: req.body.profileImagePath,
      authToken: "",
      createdDate: new Date().toISOString(),
      lastUpdatedDate: new Date().toISOString(),
    };

    const user = await User.create(document);

    return res.status(201).json({ id: user._id });
  } catch (error) {
    // Document Creation failed
    return handleServerError(res, error);
  }
}

async function patchUser(req, res) {
  // Check for valid object id
  let id = req.params.id;

  // Try making request
  try {
    const user = await User.findById(id);

    if (!user) {
      // User not found
      return res
        .status(404)
        .json({ message: `Resource with ID: [ ${id} ] not found.` });
    }

    // Make update
    user.businessName = req.body.businessName;
    user.ownerName = req.body.ownerName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.apiKey = req.body.apiKey;
    user.profileImagePath = "";
    user.authToken = "";
    user.lastUpdatedDate = new Date().toISOString();
    await user.save(req.body);

    // User found
    return res.sendStatus(204);
  } catch (error) {
    // Server error
    return handleServerError(res, error);
  }
}

async function deleteUser(req, res) {
  let id = req.params.id;
  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      // User not found
      return res
        .status(404)
        .json({ message: `Resource with ID: [ ${id} ] not found.` });
    }
    // Successful deletion
    return res.sendStatus(204);
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = { getUsers, getUser, postUser, patchUser, deleteUser };
