const { port, mongoUri } = require("./config");
const routes = require("./routes");

const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());
app.use(morgan("tiny"));

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB database");
  })
  .catch(error => {
    console.error(`An error occurred when connecting to MongoDB: ${error}`);
  });

app.use("/api/auth", routes.auth);
app.use("/api/user", routes.user);

app.listen(port, () => console.log(`Server started on port: ${port}`));
