const express = require("express");
const loginPageRoute = express.Router();
//user
loginPageRoute.get("/", (req, res) => {
  console.log("req.body >>>>>>>>>", req.body);
  res.render("loginUserPage.ejs");
});
//admin;
const adminLoginPageRoute = express.Router();
adminLoginPageRoute.get("/", (req, res) => {
  res.render("adminLoginPage");
});
module.exports = {
  loginPageRoute,
  adminLoginPageRoute,
};
