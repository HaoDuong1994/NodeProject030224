const {
  createOrderService,
  getAllCartService,
  createCustomerOrder,
  addProductToOrderService,
  addOrderToCustomerService,
} = require("../service/orderCustomerService");
const {
  getOrderService,
  updateOrderService,
} = require("../service/orderService");
const { handleDeleteItemService } = require("../service/customerService");
const { handleUpdateStock } = require("../service/productService");
const createOrderController = async (req, res) => {
  try {
    const result = await createOrderService(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const getAllCartController = async (req, res) => {
  //
  const result = await getAllCartService(req.query);
  res.status(200).json({
    EC: 0,
    data: result,
  });
  try {
  } catch (error) {
    res.status(200).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const handleOrderController = async (req, res) => {
  try {
    const dataOrderCreated = await createCustomerOrder(req.body);
    const idOrder = dataOrderCreated;
    const idProduct = req.body.productsID;
    const dataOrder = await addProductToOrderService(idOrder, idProduct);
    await addOrderToCustomerService(req, dataOrder._id);
    await handleDeleteItemService(req, idProduct);
    await handleUpdateStock(idProduct);
    // res.status(200).json({
    //   EC: 0,
    //   messsage: "Order success",
    //   dataOrder: dataOrder,
    // });
    res.redirect("/customer/order-history");
  } catch (error) {
    console.log("error from create order controller", error);
  }
};
const getOrderController = async (req, res) => {
  try {
    const data = await getOrderService();
    res.status(200).json({
      EC: 0,
      data: data,
    });
  } catch (error) {
    console.log("errorr from get Order controller", error);
  }
};
const updateOrderController = async (req, res) => {
  try {
    console.log("req.body >>>>>", req.body);
    const id = req.body.id;
    delete req.body.id;
    const data = await updateOrderService(id, req.body);
    res.status(200).json({
      EC: 0,
      message: "update sucess",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
module.exports = {
  createOrderController,
  getAllCartController,
  handleOrderController,
  getOrderController,
  updateOrderController,
};
