const Product = require("../model/productModel");
const aqp = require("api-query-params");
const createProductService = async (reqBody) => {
  //
  const resultProduct = await Product.create(reqBody);
  return resultProduct;
};
const getAllProductService = async (reqQuery) => {
  const qery = aqp(reqQuery);
  const { limit, filter } = qery;
  const { page } = filter;
  const offset = (page - 1) * limit;
  delete filter.page;
  const data = await Product.find(filter).skip(offset).limit(limit);
  return data;
};
const updateProductService = async (reqBody) => {
  //
  try {
    const idProduct = reqBody.id;
    const updateObject = reqBody;
    delete updateObject.id;
    const result = await Product.findOneAndUpdate(
      { _id: idProduct },
      updateObject
    );
    return result;
  } catch (error) {
    console.log("error from update product servicesss", error);
  }
};
const deleteProductService = async (id) => {
  try {
    const result = await Product.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log("error from delete product service", error);
  }
};

const findProductService = async (id) => {
  const result = await Product.findById(id);
  return result;
};
const findListProductByIdService = async (arrayIdProduct) => {
  try {
    let listProduct = [];
    for (let i = 0; i < arrayIdProduct.length; i++) {
      const product = await Product.findById(arrayIdProduct[i]);
      listProduct.push(product);
    }
    return listProduct;
  } catch (error) {
    console.log("error from findListProductByIdService", error);
  }
};
module.exports = {
  createProductService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  findProductService,
  findListProductByIdService,
};
