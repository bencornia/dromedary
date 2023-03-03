const { Router } = require("express");

const { getProduct } = require("../controllers/products.controller");

const productsRouter = Router();

productsRouter.get("/:id", getProduct);

module.exports = { productsRouter };
