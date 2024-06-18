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
  const token = req.cookies.jwt;
  if (token) {
    //
    jwt.verify(token, "DUONGVIHAO", async (err, decoded) => {
      if (err) res.redirect("/adminLoginPage");
      const idUser = decoded.id;
      const admin = await Admin.findById(idUser);
      if (admin) {
        next();
      } else {
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
        res.redirect("/customer/log-in");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/customer/log-in");
  }
};
module.exports = {
  verifyToken,
  checkTokenAdmin,
  checkLoginCustomer,
};
