const { Router } = require("express");

const { usersRouter } = require("./users.router");
const { productsRouter } = require("./products.router");

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/products", productsRouter);

module.exports = { indexRouter };
