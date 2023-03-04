const mongoose = require("mongoose");
const { config } = require("../config/config");

async function connectDB() {
  await mongoose.connect(config.connectionString);
  console.log("[ database ]: connected...");
}

module.exports = { connectDB };
