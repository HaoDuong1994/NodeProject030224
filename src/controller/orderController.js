const {
  createOrderService,
  getAllCartService,
  createCustomerOrder,
  addProductToOrderService,
  addOrderToCustomerService,
} = require("../service/orderCustomerService");
const { handleDeleteItemService } = require("../service/customerService");
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
    console.log("req.body in handleOrderControler", req.body);
    const dataOrderCreated = await createCustomerOrder(req.body);
    const idOrder = dataOrderCreated;
    const idProduct = req.body.productsID;
    const dataOrder = await addProductToOrderService(idOrder, idProduct);
    console.log("data order >>>>>>>>>", dataOrder);
    await addOrderToCustomerService(req, dataOrder._id);
    const data = await handleDeleteItemService(req, idProduct);
    res.status(200).json({
      EC: 0,
      messsage: "Order success",
      dataOrder: dataOrder,
    });
  } catch (error) {
    console.log("error from create order controller", error);
  }
};
module.exports = {
  createOrderController,
  getAllCartController,
  handleOrderController,
};
