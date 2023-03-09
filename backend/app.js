const express = require("express");

const { indexRouter } = require("./routes/index.router");
const { notFound } = require("./controllers/not-found.controller");
const { connectDB } = require("./models/connection");

// Create app
const app = express();

const port = process.env.PORT || 3000;

// Set up routing
// app.use(express.json());
app.use("/api", indexRouter);
app.use("*", notFound);

// Connect database
connectDB().catch((err) => console.log("[ database ]:" + err));

// Start server
app.listen(port, () => {
  console.log(`[  server  ]: listening on port ${port}...`);
});
