const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema({
  productId: Number,
  productImagePath: String,
});

const Product = mongoose.model("Product", productModel);

module.exports = { Product };
