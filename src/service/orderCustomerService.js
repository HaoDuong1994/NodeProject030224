const Order = require("../model/orderModel");
const aqp = require("api-query-params");
const { findUserByJwt } = require("../service/jwtservice");
const createOrderService = async (data) => {
  try {
    const status = data.status;
    if (status === "empty-cart") {
      delete data.status;
      console.log("dataaaaaaaaaaa", data);
      await Order.create(data);
      return {
        EC: 0,
        message: "cart was created",
      };
    }
    if (status === "add-product") {
      let myCart = await Order.findById({ _id: data.idCart });
      const listProduct = data.idProduct;
      listProduct.forEach(async (idProduct) => {
        myCart.products.push(idProduct);
      });
      await myCart.save();
    }
  } catch (error) {
    console.log("error from create order service", error);
  }
};
const getAllCartService = async (reqQuery) => {
  let page = reqQuery.page;
  const query = aqp(reqQuery);
  const { population, limit, filter } = query;
  const offset = (page - 1) * limit;
  delete filter.page;
  const result = await Order.find(filter)
    .skip(offset)
    .limit(limit)
    .populate(population);
  return result;
};
const createCustomerOrder = async (reqBody) => {
  //
  try {
    const data = await Order.create(reqBody);
    return data;
  } catch (error) {
    console.log("error from create order service", error);
  }
};
const addProductToOrderService = async (idOrder, idProduct) => {
  const order = await Order.findById(idOrder);
  console.log("order here", order);
  order.products.push(idProduct);
  await order.save();
  return order;
};
const addOrderToCustomerService = async (req, idOrder) => {
  try {
    console.log("req.coookie", req.cookies);
    const token = req.cookies.jwt;
    const user = await findUserByJwt(token);
    console.log("user herre >>>>", user);
    user.orderInfor.push(idOrder);
    await user.save();
  } catch (error) {
    console.log("error in add order to customer service", error);
  }
};
module.exports = {
  createOrderService,
  getAllCartService,
  createCustomerOrder,
  addProductToOrderService,
  addOrderToCustomerService,
};
