const express = require("express");
const { verifyToken, checkTokenAdmin } = require("../midleware/midleware");
const productRouter = express.Router();
const {
  createProductController,
  getAllProductController,
  updateProductController,
  deleteProductController,
} = require("../controller/productController");
//Create product
productRouter.post("/create-product", createProductController);
//Get all product
productRouter.get("/", verifyToken, getAllProductController);
// Update product
productRouter.post("/update-product", checkTokenAdmin, updateProductController);
// Delete product
productRouter.delete("/delete-product", deleteProductController);
module.exports = productRouter;
