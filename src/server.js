const express = require("express");
const app = express();

//require function
const configViewEngine = require("./config/viewengine");
import configBodyParser from "./config/bodyparser";
//config body-parser
configBodyParser(app);
//config view engine
configViewEngine(app, __dirname);
//config env
require("dotenv").config();
let port = process.env.PORT;
console.log("port o day la", port);
app.get("/", function (req, res) {
  console.log("req.body", req.body);
  res.render("homepage.ejs");
});

app.listen(port, () => {
  console.log("server listen on port 3000 ");
});
