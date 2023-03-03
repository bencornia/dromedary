const { Router } = require("express");

const { getUser } = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter.get("/:id", getUser);

module.exports = { usersRouter };
