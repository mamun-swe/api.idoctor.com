require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { AppErrorHandeller } = require("./middleware/error-handeller");
const { routers } = require("./routes");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.use("/uploads", express.static("uploads/"));

app.get("/", (req, res) => {
  res.send("Hello I am node.js application");
});

// API URL's
app.use("/api/v1", routers);

app.use((req, res, next) => {
  let error = new Error("404 page Not Found");
  error.status = 404;
  next(error);
});

app.use(AppErrorHandeller);

module.exports = { app };
