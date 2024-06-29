const express = require("express");
const Admin = require("../model/adminModel");
const { findProductService } = require("../service/productService");
const {
  handleAdminAnalistController,
  handleStatisticSpecificday,
  orderConfirmController,
  handleOrderController,
} = require("../controller/adminController");
const { findUserByJwt, findAdminByJwt } = require("../service/jwtservice");
const { verifyToken, checkTokenAdmin } = require("../midleware/midleware");
const productPageRoute = express.Router();
const Product = require("../model/productModel");
//Route

//Home
productPageRoute.get("/home", checkTokenAdmin, async (req, res) => {
  const products = await Product.find({});
  res.render("productPage.ejs", { listProduct: products });
});
productPageRoute.get("/edit-product/:id", async (req, res) => {
  console.log(req.params);
  const product = await findProductService(req.params.id);
  console.log("proeduct", product);
  res.render("editProductPage.ejs", { product: product });
});
//Create product
productPageRoute.get("/create-product", checkTokenAdmin, async (req, res) => {
  res.render("createProductPage.ejs");
});
//Create product by file
productPageRoute.get("/create-many-product", checkTokenAdmin, (req, res) => {
  res.render("adminCreateManyProduct.ejs");
});
//Account Infor
productPageRoute.get("/account", checkTokenAdmin, async (req, res) => {
  const token = req.cookies.jwt;
  const user = await findAdminByJwt(token);
  res.render("adminProfilePage.ejs", { user });
});
//Data Statistic
productPageRoute.get(
  "/order-statistics",
  checkTokenAdmin,
  handleAdminAnalistController
);
//Order Statistic last 10 days
productPageRoute.get(
  "/order-statistics/last-10-days",
  checkTokenAdmin,
  handleAdminAnalistController
);
//Order Statistic last months
productPageRoute.get(
  "/order-statistics/last-months",
  checkTokenAdmin,
  handleAdminAnalistController
);
//Order Statistic last months
productPageRoute.post(
  "/order-statistics/specific-day",
  checkTokenAdmin,
  handleStatisticSpecificday
);
//Order confirmation page
productPageRoute.get("/confirm-order", checkTokenAdmin, orderConfirmController);
//View detail Order confirmation page
productPageRoute.get(
  "/confirm-order/:id",
  checkTokenAdmin,
  handleOrderController
);
//Admin login
productPageRoute.get("/log-in", (req, res) => {
  res.render("adminLoginPage");
});
//Admin sign up
productPageRoute.get("/sign-up", (req, res) => {
  res.render("adminSignUp.ejs");
});
module.exports = productPageRoute;
