import express from "express";
const app = express();
const customerRouter = express.Router();
customerRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const {
  deleteItemController,
  createCustomerController,
  getAllCustomerController,
  updateCustomerController,
  deleteCustomerController,
  loginCustomerController,
  addCartCustomerController,
  logoutCustomerController,
  addCartController,
} = require("../controller/customerControler");
//Create customer
customerRouter.post("/create-customer", createCustomerController);
//Get All customer
customerRouter.get("/get-all-customer", getAllCustomerController);
//Update customer
customerRouter.put("/update-customer", updateCustomerController);
//Delete a customer
customerRouter.delete("/delete-customer", deleteCustomerController);
// Login customer
customerRouter.post("/login", loginCustomerController);
//Logout customer
customerRouter.post("/logout", logoutCustomerController);
//Add cart
customerRouter.put("/add-cart", addCartCustomerController);
//Add cart
customerRouter.post("/add-cart/:idProduct", addCartController);
//Delete item in cart
customerRouter.post("/delete-item/:idProduct", deleteItemController);
module.exports = customerRouter;
