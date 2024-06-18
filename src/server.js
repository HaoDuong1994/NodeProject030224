const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
//require function
const configViewEngine = require("./config/viewengine");
import configBodyParser from "./config/bodyparser";
import connection from "./config/connectionDatabase";
const customerRouter = require("./route/customerRouter");
const {
  loginPageRoute,
  adminLoginPageRoute,
} = require("./route/loginPageRoute");
const adminRouter = require("./route/adminRouter");
const productRouter = require("./route/productRouter");
const orderRoute = require("./route/orderRoute");
const editProductRoute = require("./route/editProductRoute");
const productPageRoute = require("./route/productPageRoute");
const customerProductPageRoute = require("./route/userProductPageRoute");

//config body-parser
configBodyParser(app);
//config cookie - parser
app.use(cookieParser());
//config view engine
configViewEngine(app, __dirname);
//config env
require("dotenv").config();
let port = process.env.PORT;
//config connection to data base;
(async () => {
  //<<<<<<<<<<<<<<self running function
  try {
    await connection();
    app.listen(port, () => {
      console.log("server listen on port 3000 ");
    });
  } catch (error) {
    console.log("error with connection >>>>>>>>", error);
  }
})();

///////////////////   API    /////////////////////
//Customer Route
app.use("/customer", customerRouter);
//Admin Route
app.use("/admin", adminRouter);
//Product Route
app.use("/product", productRouter);
//Order Route
app.use("/order", orderRoute);

///////////////////   UI    ////////////////////
// User Login page
app.use("/userLoginPage", loginPageRoute);
//Customer product page
app.use("/customer", customerProductPageRoute);
// Admin login page
app.use("/adminLoginPage", adminLoginPageRoute);
//edit Product Page
app.use("/editProductPage", editProductRoute);
//Admin Page
app.use("/admin", productPageRoute);
