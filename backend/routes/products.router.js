const { Router } = require("express");

// Import middleware
const { body } = require("express-validator");
const { validateObjectId } = require("../middleware/objectId.middleware");
const { uploadWrapper } = require("../middleware/uploadImage.middleware");
const { validateResult } = require("../middleware/validateResult.middleware");
const { checkAuth } = require("../middleware/checkAuth.middleware");

// Import controllers
const prodController = require("../controllers/products.controller");

const productsRouter = Router();
const productImageFieldName = "productImage";

// GET
productsRouter.get("", checkAuth, prodController.getAllProducts);
productsRouter.get(
    "/business/:id",
    validateObjectId,
    prodController.getProductsByBusiness
);

// GET by id
productsRouter.get(
    "/:id",
    checkAuth,
    validateObjectId,
    prodController.getProduct
);

// POST
productsRouter.post(
    "/:id",
    checkAuth,
    uploadWrapper(productImageFieldName),
    validateObjectId,
    body("productName").not().isEmpty().escape(),
    validateResult,
    prodController.postProduct
);

// PUT
productsRouter.put(
    "/:id",
    checkAuth,
    uploadWrapper(productImageFieldName),
    validateObjectId,
    body("productName").not().isEmpty().escape(),
    validateResult,
    prodController.putProduct
);

// DELETE
productsRouter.delete(
    "/:id",
    checkAuth,
    validateObjectId,
    prodController.deleteProduct
);

module.exports = { productsRouter };
