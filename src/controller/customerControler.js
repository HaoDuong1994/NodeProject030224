const { findUserByJwt } = require("../service/jwtservice");
const {
  createCustomerService,
  getAllCustomerService,
  updateCustomerService,
  deleteCustomerService,
  loginCustomerService,
  addCartService,
  addToCartService,
  handleCartCustomerService,
  handleDeleteItemService,
  handleOrderAllCartCustomerService,
  handleOrderHistoryService,
} = require("../service/customerService");
const {
  getAllProductService,
  findProductService,
  findListProductByIdService,
} = require("../service/productService");
const moment = require("moment");
const { singleUploadFile } = require("../service/uploadFileCustomerService");
const hassPassword = require("../service/hashPasswordService");
const createCustomerController = async (req, res) => {
  try {
    console.log("reqbodyyyyyyyy", req.url);
    let password = req.body.password;
    const hashPassword = await hassPassword(password);
    req.body.password = hashPassword;
    // Create customer
    let result = await createCustomerService(req.body, res);
    if (req.url === "/sign-up") {
      res.redirect("/customer/product");
    } else {
      res.status(200).json({
        EC: 0,
        data: result,
      });
    }
  } catch (error) {
    res.status(200).json({
      EC: 1,
      error: JSON.stringify(error),
    });
  }
};
const getAllCustomerController = async (req, res) => {
  try {
    const result = await getAllCustomerService(req.query);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    console.log("error from get CustomerController", error);
  }
};
//update
const updateCustomerController = async (req, res) => {
  try {
    const id = req.body.id;
    delete req.body.id;
    const result = await updateCustomerService(id, req.body);
    res.status(200).json({
      EC: 0,
      result: result,
    });
  } catch (error) {
    console.log("error from uopdateCustomer", error);
  }
};
//delete
const deleteCustomerController = async (req, res) => {
  try {
    const idCustomer = req.body.id;
    const result = await deleteCustomerService(idCustomer);
    res.status(200).json({
      EC: 0,
      result: result,
    });
  } catch (error) {
    console.log("error from deleteCustomerController", error);
  }
};
//login
const loginCustomerController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginCustomerService(email, password, res);
    if (result.message === "Login Sucess")
      return res.redirect("/customer/product");
    res.render("responseLoginPage.ejs", { status: result.message });
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
//Logout
const logoutCustomerController = async (req, res) => {
  //
  res.clearCookie("jwt");
  res.redirect("/customer/log-in");
};
//add cart
const addCartCustomerController = async (req, res) => {
  try {
    const result = await addCartService(req.body);
    res.status(200).json({
      EC: 0,
      message: result,
    });
  } catch (error) {
    res.status(200).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
//Page
const getAllProductPageController = async (req, res) => {
  let data = [];
  if (req.query) {
    const listProduct = await getAllProductService(req.query);
    data = listProduct;
  } else {
    const listProduct = await getAllProductService();
    data = listProduct;
  }
  const token = req.cookies.jwt;
  const user = await findUserByJwt(token);
  res.render("customerProductPage.ejs", { listProduct: data, user });
};
const addCartController = async (req, res) => {
  const idProduct = req.params.idProduct;
  await addToCartService(idProduct, req);
  res.redirect("/customer/cart");
};
const handleCartCustomerController = async (req, res) => {
  try {
    const cartInfor = await handleCartCustomerService(req);
    const products = await findListProductByIdService(cartInfor);
    const totalPrice = products.reduce((total, currentProduct) => {
      return total + Number(currentProduct.price);
    }, 0);
    res.render("customerCartPage.ejs", {
      listProduct: products,
      totalPrice: totalPrice,
    });
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const deleteItemController = async (req, res) => {
  try {
    const idProduct = req.params.idProduct;
    await handleDeleteItemService(req, idProduct);
    res.redirect("/customer/cart");
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const handleCustomerOrder = async (req, res) => {
  try {
    const { idProduct, totalPrice } = req.params;
    const user = await findUserByJwt(req.cookies.jwt);
    console.log("user >>>", user);
    if (idProduct === "allProduct") {
      const listProduct = await handleOrderAllCartCustomerService(req);
      res.render("customerOrderPage.ejs", {
        product: listProduct,
        totalPrice: totalPrice,
        user: user,
      });
    } else {
      ///Single product
      const product = await findProductService(idProduct);
      const arrayProduct = [];
      arrayProduct.push(product);
      const totalPrice = product.price;
      res.render("customerOrderPage.ejs", {
        product: arrayProduct,
        totalPrice: totalPrice,
        user: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const handlehistoryOrderController = async (req, res) => {
  try {
    const dataOrder = await handleOrderHistoryService(req);
    for (let i = 0; i < dataOrder.length; i++) {
      if (dataOrder[i] == null) {
        dataOrder.splice(i, 1);
        i--;
      }
    }
    res.render("orderHistoryPage.ejs", { dataOrder, moment: moment });
  } catch (error) {
    res.status(400).json({ EC: 0, message: JSON.stringify(error) });
  }
};
const handleCustomerInformation = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const user = await findUserByJwt(token);
    res.render("customerInforPage.ejs", { user });
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
module.exports = {
  createCustomerController,
  getAllCustomerController,
  updateCustomerController,
  deleteCustomerController,
  loginCustomerController,
  addCartCustomerController,
  getAllProductPageController,
  logoutCustomerController,
  addCartController,
  handleCartCustomerController,
  deleteItemController,
  handleCustomerOrder,
  handlehistoryOrderController,
  handleCustomerInformation,
};
