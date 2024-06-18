const aqp = require("api-query-params");
const Order = require("../model/orderModel");
const getOrderService = async (reqQuery) => {
  if (reqQuery) {
    const query = aqp(reqQuery);
    const { filter } = query;
    const data = await Order.find(filter);
    return data;
  } else {
    const data = await Order.find({});
    return data;
  }
};
const updateOrderService = async (id, ObjectUpdate) => {
  try {
    const data = await Order.findOneAndUpdate({ _id: id }, ObjectUpdate);
    data.save();
    return data;
  } catch (error) {
    console.log("error from update order service", error);
  }
};
module.exports = {
  getOrderService,
  updateOrderService,
};
