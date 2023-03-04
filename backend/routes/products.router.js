const { Router } = require("express");

const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const productsRouter = Router();

productsRouter.get("/:id", getProduct);
productsRouter.post("/:id", postProduct);
productsRouter.put("/:id", putProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = { productsRouter };
