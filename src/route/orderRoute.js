const express = require("express");
const orderRoute = express.Router();
const {
  createOrderController,
  getAllCartController,
  handleOrderController,
  getOrderController,
  updateOrderController,
} = require("../controller/orderController");
//Get order
orderRoute.get("/get-all-order", getOrderController);
//Create cart
orderRoute.post("/add-to-cart", createOrderController);
//Create order
orderRoute.post("/create-order", handleOrderController);
//Get All cart
orderRoute.get("/", getAllCartController);
//Update Order
orderRoute.post("/update-order", updateOrderController);
module.exports = orderRoute;
