const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const configViewEngine = require("./config/viewengine");
import configBodyParser from "./config/bodyparser";
import connection from "./config/connectionDatabase";
const customerRouter = require("./route/customerRouter");
const adminRouter = require("./route/adminRouter");
const productRouter = require("./route/productRouter");
const orderRoute = require("./route/orderRoute");
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

//Customer product page
app.use("/customer", customerProductPageRoute);

//Admin Page
app.use("/admin", productPageRoute);
