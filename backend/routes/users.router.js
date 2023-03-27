const { Router } = require("express");
const express = require("express");

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
    userController.postUser
);

// PUT
usersRouter.put(
    "/:id",
    validateObjectId,
    upload.uploadWrapper(imageFieldName),
    userController.putUser
);

// DELETE
usersRouter.delete("/:id", validateObjectId, userController.deleteUser);

// login
usersRouter.post("/login", express.json(), userController.login);

module.exports = { usersRouter };
