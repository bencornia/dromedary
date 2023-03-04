const { Router } = require("express");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/:id", getUser);
usersRouter.post("/:id", postUser);
usersRouter.put("/:id", putUser);
usersRouter.delete("/:id", deleteUser);

module.exports = { usersRouter };
