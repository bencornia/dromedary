const { Router } = require("express");

const { createUserValidator } = require("../validation/users.validation");
const {
  validateObjectId,
} = require("../middleware/validateObjectId.middleware");

const {
  encryptPassword,
  encryptApiKey,
} = require("../middleware/encryptData.middleware");

const {
  uploadImageFileWrapper,
} = require("../middleware/uploadFile.middleware");

const {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("", getUsers);
usersRouter.get("/:id", validateObjectId, getUser);
usersRouter.post(
  "",
  uploadImageFileWrapper("profileImage"),
  createUserValidator,
  encryptPassword,
  encryptApiKey,
  postUser
);
usersRouter.patch(
  "/:id",
  // createUserValidator,
  encryptPassword,
  encryptApiKey,
  validateObjectId,
  patchUser
);
usersRouter.delete("/:id", validateObjectId, deleteUser);

module.exports = { usersRouter };
