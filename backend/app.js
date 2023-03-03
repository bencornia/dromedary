const express = require("express");

const { indexRouter } = require("./routes/index.router");
const { notFound } = require("./controllers/not-found.controller");

const app = express();

const port = process.env.PORT || 3000;

app.use("/api", indexRouter);
app.use("*", notFound);

app.listen(port, () => {
  console.log(`[ server ]: listening on port ${port}...`);
});
