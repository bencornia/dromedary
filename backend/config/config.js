require("dotenv").config();

const config = {
  connectionString: process.env.DB_CONNECTION_STRING,
  secretKey: process.env.SECRET_KEY,
};

module.exports = { config };
