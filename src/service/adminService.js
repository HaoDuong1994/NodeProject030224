const Admin = require("../model/adminModel");
const moment = require("moment");
const Order = require("../model/orderModel");
const hashPassword = require("./hashPasswordService");

const createAdminService = async (reqBody) => {
  const hash = await hashPassword(reqBody.password);
  reqBody.password = hash;
  const result = await Admin.create(reqBody);
  return result;
};
const getAllAdminService = async () => {
  const result = await Admin.find({});
  return result;
};
const updateAdminService = async (id, reqBody) => {
  const result = await Admin.updateOne({ _id: id }, reqBody);
  return result;
};
const deleteAdminService = async (id) => {
  const result = await Admin.delete({ _id: id });
  return result;
};

const handleAdminOrderAnalystService = async (req, res) => {
  try {
    //Last months
    if (req.path == "/order-statistics/last-months") {
      const lastMonth = moment().add(-1, "months").startOf("months");
      const lastMonthEnd = moment().add(-1, "months").endOf("months");
      const dataOrder = await Order.find({
        createdAt: {
          $gte: lastMonth.toDate(),
          $lt: lastMonthEnd.toDate(),
        },
      });
      const totalPrice = dataOrder.reduce((total, current) => {
        return total + Number(current.totalPrice);
      }, 0);
      const status = "Last 10 months Statistic";
      const listData = {
        todayOrderList: dataOrder,
        totalPrice,
        status,
      };
      return listData;
    }
    //Last 10 days
    if (req.path == "/order-statistics/last-10-days") {
      const last10Days = moment().add(-10, "days");
      const dataOrder = await Order.find({
        createdAt: {
          $gte: last10Days.toDate(),
        },
      });
      const totalPrice = dataOrder.reduce((total, current) => {
        return total + Number(current.totalPrice);
      }, 0);
      const status = "Last 10days Statistic";
      const listData = {
        todayOrderList: dataOrder,
        totalPrice,
        status,
      };
      return listData;
    } else {
      // Today
      const today = moment().startOf("day");
      const dataOrder = await Order.find({
        createdAt: {
          $gte: today.toDate(),
        },
      });
      const totalPrice = dataOrder.reduce((total, current) => {
        return total + Number(current.totalPrice);
      }, 0);
      const listData = {
        todayOrderList: dataOrder,
        totalPrice,
      };
      return listData;
    }
  } catch (error) {
    console.log("error from admin analist service", error);
  }
};
const handleStatisticSpecificDay = async (req, res) => {
  try {
    //query Order
    const getDay = req.body.day;
    const startDay = moment(getDay).startOf("day");
    const endDay = moment(getDay).endOf("day");
    const orderList = await Order.find({
      createdAt: {
        $gte: startDay.toDate(),
        $lte: endDay.toDate(),
      },
    });

    // caculate total price
    const totalPrice = orderList.reduce((total, current) => {
      return total + Number(current.totalPrice);
    }, 0);

    // create Status render
    const status = "Search Specific Day";

    //final Data
    const listData = {
      todayOrderList: orderList,
      totalPrice,
      status,
    };
    return listData;
  } catch (error) {
    console.log("error from handleStaticSpecificday", error);
  }
};
module.exports = {
  createAdminService,
  getAllAdminService,
  updateAdminService,
  deleteAdminService,
  handleAdminOrderAnalystService,
  handleStatisticSpecificDay,
};
