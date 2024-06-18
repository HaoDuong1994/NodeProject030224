const express = require("express");
const {
  getAllProductPageController,
  handleCartCustomerController,
  handleCustomerOrder,
  handlehistoryOrderController,
  handleCustomerInformation,
} = require("../controller/customerControler");
const { checkLoginCustomer } = require("../midleware/midleware");
const customerProductPageRoute = express.Router();

//////////////////////////////////////////////////////////

//Customer product page
customerProductPageRoute.get(
  "/product",
  checkLoginCustomer,
  getAllProductPageController
);

//Customer cart page
customerProductPageRoute.get("/cart", handleCartCustomerController);

//Order page
customerProductPageRoute.get(
  "/order/:idProduct/:totalPrice/",
  handleCustomerOrder
);

//History order
customerProductPageRoute.get("/order-history", handlehistoryOrderController);

//User information page
customerProductPageRoute.get(
  "/user-information/:id",
  handleCustomerInformation
);

//User sign up page
customerProductPageRoute.get("/sign-up", (req, res) => {
  res.render("customerSigupPage.ejs");
});

//User login page
customerProductPageRoute.get("/log-in", (req, res) => {
  res.render("loginUserPage.ejs");
});

module.exports = customerProductPageRoute;
