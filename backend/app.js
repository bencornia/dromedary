const express = require("express");
const cors = require("cors");

const { indexRouter } = require("./routes/index.router");
const { notFound } = require("./controllers/not-found.controller");
const { connectDB } = require("./models/connection");
const { setHeaders } = require("./middleware/setHeaders.middleware");

// Create app
const app = express();

const port = process.env.PORT || 3000;

// Set CORS policy
app.use(cors());

// Mount images on separate route
app.use("/images", express.static("uploads"));

// Set up routing
app.use("/api", indexRouter);
app.use("*", notFound);

// Connect database
connectDB().catch((err) => console.log("[ database ]:" + err));

// Start server
app.listen(port, () => {
  console.log(`[  server  ]: listening on port ${port}...`);
});
