const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema({
    businessId: String,
    productId: String,
    productImagePath: String,
});

const Product = mongoose.model("Product", productModel);

module.exports = { Product };
