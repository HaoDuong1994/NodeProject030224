const express = require("express");
const {
  getAllProductPageController,
} = require("../controller/customerControler");
const { checkLoginCustomer } = require("../midleware/midleware");
const {
  handleCartCustomerController,
  handleCustomerOrder,
} = require("../controller/customerControler");
const customerProductPageRoute = express.Router();
//////////////////////////////////////////////////////////
customerProductPageRoute.get(
  "/",
  checkLoginCustomer,
  getAllProductPageController
);
customerProductPageRoute.get("/cart", handleCartCustomerController);
//Order page
customerProductPageRoute.get("/order/:idProduct", handleCustomerOrder);
module.exports = customerProductPageRoute;
