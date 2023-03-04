const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  businessName: String,
  profileImagePath: String,
  ownerName: String,
  email: String,
  password: String,
  apiKey: String,
  authToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
