const Customer = require("../model/customerModel");
const bcrypt = require("bcryptjs");
const aqp = require("api-query-params");
const { findOrderById } = require("../service/orderCustomerService");
const { createToken, getIdByJwt } = require("../service/jwtservice");
const { findProductService } = require("../service/productService");
const createCustomerService = async (reqBody, res) => {
  try {
    let result = await Customer.create(reqBody);
    const token = createToken(result._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return result;
  } catch (error) {
    console.log("erroor from create customer service", error);
  }
};
const getAllCustomerService = async (reqQuery) => {
  const { limit, filter, population } = aqp(reqQuery);
  const { page } = filter;
  if (limit && page) {
    let skip = (page - 1) * limit;
    delete filter.page;
    const result = await Customer.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-password")
      .populate(population)
      .exec();
    if (result.length === 0)
      return {
        Message: "No user found",
      };
    return result;
  } else {
    const result = await Customer.find({});
    return result;
  }
};
const updateCustomerService = async (id, object) => {
  const result = await Customer.findByIdAndUpdate(id, object);
  return result;
};
const deleteCustomerService = async (id) => {
  const result = await Customer.delete({ _id: id });
  return result;
};
//login service
const loginCustomerService = async (email, password, res) => {
  try {
    //Check email
    const user = await Customer.findOne({ email }).select("+password").exec();
    if (!user)
      return {
        error: 1,
        message: "Invalid Email",
      };
    //CheckPassword
    const hash = user.password;
    const validPassWord = await bcrypt.compare(password, hash);
    if (!validPassWord)
      return {
        error: 1,
        message: "Invalid Password",
      };
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true });
    return {
      error: 0,
      message: "Login Sucess",
    };
  } catch (error) {
    console.log("error from login user service", error);
  }
};

const addCartService = async (reqBody) => {
  console.log("req.body >>>", reqBody);
  const id = reqBody.idCustomer;
  const myCustomer = await Customer.findById({ _id: id });
  if (myCustomer) {
    const addCart = await Customer.updateOne(
      { _id: id },
      { orderInfor: reqBody.idCart }
    );
    return addCart;
  }
  try {
  } catch (error) {
    console.log("error with add cart customer service", error);
  }
};
const addToCartService = async (idProduct, req) => {
  const token = req.cookies.jwt;
  const idUser = getIdByJwt(token);
  const user = await Customer.findById(idUser);
  user.cartInfor.push(idProduct);
  await user.save();
};
const handleCartCustomerService = async (req) => {
  try {
    const token = req.cookies.jwt;
    const idUser = getIdByJwt(token);
    const user = await Customer.findById(idUser);
    const cartInfor = user.cartInfor;
    return cartInfor;
  } catch (error) {
    console.log("error from handleCustomerCartService", error);
  }
};
const handleDeleteItemService = async (req, idProduct) => {
  try {
    const token = req.cookies.jwt;
    const idUser = getIdByJwt(token);
    const user = await Customer.findById(idUser);
    //Chỉ xóa một sản phẩm khi có giá trị giống nhau
    if (Array.isArray(idProduct)) {
      for (let i = 0; i < idProduct.length; i++) {
        user.cartInfor.splice(user.cartInfor.indexOf(idProduct[i]), 1);
      }
    } else {
      user.cartInfor.splice(user.cartInfor.indexOf(idProduct), 1);
    }
    await user.save();
    return user.orderInfor;
  } catch (error) {
    console.log("error from handleDeleteItem service", error);
  }
};
const handleOrderAllCartCustomerService = async (req) => {
  //
  const token = req.cookies.jwt;
  const idUser = getIdByJwt(token);
  const user = await Customer.findById(idUser);
  const arrayIdProductIncart = user.cartInfor;
  const listProduct = await findProductService(arrayIdProductIncart);
  return listProduct;
};
const handleOrderHistoryService = async (req) => {
  const token = req.cookies.jwt;
  const idUser = getIdByJwt(token);
  const user = await Customer.findById(idUser);
  const orderInfor = user.orderInfor;
  const data = await findOrderById(orderInfor);
  return data;
};
module.exports = {
  createCustomerService,
  getAllCustomerService,
  updateCustomerService,
  deleteCustomerService,
  addCartService,
  loginCustomerService,
  addToCartService,
  handleCartCustomerService,
  handleDeleteItemService,
  handleOrderAllCartCustomerService,
  handleOrderHistoryService,
};
