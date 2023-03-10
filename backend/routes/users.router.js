const { Router } = require("express");

// Import middlewares
const { createUserValidator } = require("../validation/users.validation");
const { validateObjectId } = require("../middleware/objectId.middleware");
const encrypt = require("../middleware/encryptData.middleware");
const upload = require("../middleware/uploadImage.middleware");
const { validateResult } = require("../middleware/validateResult.middleware");

// Import controllers
const userController = require("../controllers/users.controller");

const usersRouter = Router();
const imageFieldName = "profileImage";

// GET
usersRouter.get("", userController.getUsers);
usersRouter.get("/:id", validateObjectId, userController.getUser);

// POST
usersRouter.post(
  "",
  upload.uploadWrapper(imageFieldName),
  createUserValidator,
  validateResult,
  encrypt.encryptPassword,
  encrypt.encryptApiKey,
  userController.postUser
);

// PUT
usersRouter.put(
  "/:id",
  validateObjectId,
  upload.uploadWrapper(imageFieldName),
  createUserValidator,
  validateResult,
  encrypt.encryptPassword,
  encrypt.encryptApiKey,
  userController.putUser
);

// DELETE
usersRouter.delete("/:id", validateObjectId, userController.deleteUser);

module.exports = { usersRouter };
