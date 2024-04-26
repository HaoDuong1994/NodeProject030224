const jwt = require("jsonwebtoken");
const Admin = require("../model/adminModel");
const alert = require("alert");
const Customer = require("../model/customerModel");
const verifyToken = (req, res, next) => {
  const adminToken = req.cookies.jwt;
  if (adminToken) {
    jwt.verify(adminToken, "DUONGVIHAO", async (err, decoded) => {
      if (err) {
        res.redirect("/loginPage");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/loginPage");
  }
};

const checkTokenAdmin = (req, res, next) => {
  console.log("tokeennnnnn", req.cookies);
  const token = req.cookies.jwt;
  if (token) {
    //
    jwt.verify(token, "DUONGVIHAO", async (err, decoded) => {
      if (err) res.redirect("/adminLoginPage");
      const idUser = decoded.id;
      const admin = await Admin.findById(idUser);
      console.log("admin here", admin);
      if (admin) {
        next();
      } else {
        console.log("you are not allowed to do this");
        res.redirect("/adminLoginPage");
      }
    });
  } else {
    res.redirect("/adminLoginPage");
  }
};
const checkLoginCustomer = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "DUONGVIHAO", (err, decoded) => {
      if (err) {
        res.redirect("/userLoginPage");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/userLoginPage");
  }
};
module.exports = {
  verifyToken,
  checkTokenAdmin,
  checkLoginCustomer,
};
