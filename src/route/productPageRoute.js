const express = require("express");
const { verifyToken, checkTokenAdmin } = require("../midleware/midleware");
const productPageRoute = express.Router();
const Product = require("../model/productModel");
productPageRoute.get("/", checkTokenAdmin, async (req, res) => {
  const products = await Product.find({});
  console.log("product >>>>>>", products);
  res.render("productPage.ejs", { listProduct: products });
});
productPageRoute.get("/create-product", checkTokenAdmin, async (req, res) => {
  res.render("createProductPage.ejs");
});
module.exports = productPageRoute;
