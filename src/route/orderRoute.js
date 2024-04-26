const express = require("express");
const orderRoute = express.Router();
const {
  createOrderController,
  getAllCartController,
  handleOrderController,
} = require("../controller/orderController");
//Create cart
orderRoute.post("/add-to-cart", createOrderController);
//Create order
orderRoute.post("/create-order", handleOrderController);
//Get All cart
orderRoute.get("/", getAllCartController);
module.exports = orderRoute;
