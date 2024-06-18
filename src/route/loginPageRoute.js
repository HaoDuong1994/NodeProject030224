const express = require("express");
const loginPageRoute = express.Router();
//admin;
const adminLoginPageRoute = express.Router();
adminLoginPageRoute.get("/", (req, res) => {
  res.render("adminLoginPage");
});
module.exports = {
  loginPageRoute,
  adminLoginPageRoute,
};
