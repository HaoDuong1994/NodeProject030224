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
customerProductPageRoute.get(
  "/",
  checkLoginCustomer,
  getAllProductPageController
);
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
module.exports = customerProductPageRoute;
