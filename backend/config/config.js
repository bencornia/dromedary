require("dotenv").config();

const config = {
  connectionString: process.env.DB_CONNECTION_STRING,
};

module.exports = { config };
