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
  if (Array.isArray(idProduct)) {
    for (let i = 0; i < idProduct.length; i++) {
      order.products.push(idProduct[i]);
      await order.save();
    }
    return order;
  } else {
    order.products.push(idProduct);
    return order;
  }
};

const addOrderToCustomerService = async (req, idOrder) => {
  try {
    const token = req.cookies.jwt;
    const user = await findUserByJwt(token);
    user.orderInfor.push(idOrder);
    await user.save();
  } catch (error) {
    console.log("error in add order to customer service", error);
  }
};

const findOrderById = async (id) => {
  if (Array.isArray(id)) {
    let arrayOrder = [];
    for (let i = 0; i < id.length; i++) {
      const data = await Order.findById(id[i])
        .populate({ path: "products" })
        .lean()
        .exec();
      arrayOrder.push(data);
    }
    return arrayOrder;
  } else {
    console.log("not arrray");
  }
};
module.exports = {
  createOrderService,
  getAllCartService,
  createCustomerOrder,
  addProductToOrderService,
  addOrderToCustomerService,
  findOrderById,
};
