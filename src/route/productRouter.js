const express = require("express");
const { verifyToken, checkTokenAdmin } = require("../midleware/midleware");
const multer = require("multer");
const { productImgStorage } = require("../service/uploadFileService");
const upload = multer({ storage: productImgStorage });
const productRouter = express.Router();
const {
  createProductController,
  getAllProductController,
  updateProductController,
  deleteProductController,
  createManyProductController,
} = require("../controller/productController");

//Create product
productRouter.post(
  "/create-product",
  upload.single("productImg"),
  createProductController
);

//Get all product
productRouter.get("/", verifyToken, getAllProductController);
// Update product
productRouter.post("/update-product", checkTokenAdmin, updateProductController);
// Delete product
productRouter.delete("/delete-product", deleteProductController);
//Upload many product
productRouter.post("/create-many-product", createManyProductController);
module.exports = productRouter;
