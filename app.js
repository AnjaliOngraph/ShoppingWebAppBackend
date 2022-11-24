require("dotenv").config();
require("./config/database");
const express = require("express");
const app = express();
app.use(express.json());

const product = require("./Routes/productRoutes");

app.use("/",product);

module.exports = app;