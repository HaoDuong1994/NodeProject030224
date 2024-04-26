const express = require("express");
const editProductRoute = express.Router();
const { checkTokenAdmin } = require("../midleware/midleware");
const { getAllProductPage } = require("../controller/productController");
editProductRoute.get("/:id", checkTokenAdmin, getAllProductPage);
module.exports = editProductRoute;
