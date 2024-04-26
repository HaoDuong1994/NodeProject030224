const jwt = require("jsonwebtoken");
const Customer = require("../model/customerModel");
require("dotenv").config();
const createToken = (id) => {
  const expireDay = 3 * 24 * 60 * 60;
  const token = jwt.sign({ id: id }, process.env.PRIVATE_KEY, {
    expiresIn: expireDay,
  });
  return token;
};
const getIdByJwt = (token) => {
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  return decoded.id;
};
const findUserByJwt = async (token) => {
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  const idUser = decoded.id;
  const user = await Customer.findById(idUser);
  return user;
};
module.exports = { createToken, getIdByJwt, findUserByJwt };
