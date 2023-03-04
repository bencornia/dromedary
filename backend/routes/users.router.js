const { Router } = require("express");

const { createUserValidator } = require("../validation/users.validation");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/:id", getUser);
usersRouter.post("/:id", createUserValidator, postUser);
usersRouter.put("/:id", putUser);
usersRouter.delete("/:id", deleteUser);

module.exports = { usersRouter };
