const express = require("express");
const Admin = require("../model/adminModel");
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
productPageRoute.get("/home", async (req, res) => {
  const products = await Product.find({});
  res.render("productPage.ejs", { listProduct: products });
});
//Create product
productPageRoute.get("/create-product", async (req, res) => {
  res.render("createProductPage.ejs");
});
//Create product by file
productPageRoute.get("/create-many-product", (req, res) => {
  res.render("adminCreateManyProduct.ejs");
});
//Account Infor
productPageRoute.get("/account", async (req, res) => {
  const token = req.cookies.jwt;
  const user = await findAdminByJwt(token);
  res.render("adminProfilePage.ejs", { user });
});
//Data Statistic
productPageRoute.get("/order-statistics", handleAdminAnalistController);
//Order Statistic last 10 days
productPageRoute.get(
  "/order-statistics/last-10-days",
  handleAdminAnalistController
);
//Order Statistic last months
productPageRoute.get(
  "/order-statistics/last-months",
  handleAdminAnalistController
);
//Order Statistic last months
productPageRoute.post(
  "/order-statistics/specific-day",
  handleStatisticSpecificday
);
//Order confirmation page
productPageRoute.get("/confirm-order", orderConfirmController);
//View detail Order confirmation page
productPageRoute.get("/confirm-order/:id", handleOrderController);
//Admin login
productPageRoute.get("/log-in", (req, res) => {
  res.render("adminLoginPage");
});
module.exports = productPageRoute;
