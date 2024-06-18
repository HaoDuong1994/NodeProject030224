const Product = require("../model/productModel");
const multer = require("multer");
const path = require("path");
const csv = require("csvtojson");

const aqp = require("api-query-params");
const createProductService = async (reqBody) => {
  const resultProduct = await Product.create(reqBody);
  return resultProduct;
};
const getAllProductService = async (reqQuery) => {
  const qery = aqp(reqQuery);
  const { limit, filter } = qery;
  const { page } = filter;
  const offset = (page - 1) * limit;
  delete filter.page;
  if (reqQuery.name) {
    const data = await Product.find({
      name: { $regex: ".*" + reqQuery.name + ".*" },
    })
      .skip(offset)
      .limit(limit);
    return data;
  } else {
    const data = await Product.find(filter).skip(offset).limit(limit);
    return data;
  }
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
    result.save();
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
  if (Array.isArray(id)) {
    //
    const listProduct = [];
    for (let i = 0; i < id.length; i++) {
      const singleProduct = await Product.findById(id[i]);
      listProduct.push(singleProduct);
    }
    return listProduct;
  } else {
    const result = await Product.findById(id);
    return result;
  }
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
// insert many product by file

const insertManyProductService = async (req, res) => {
  let arrayData = [];
  //create file upload path
  const filePath = path.join(__dirname, "..", "uploadFile");
  //create storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  //create upload file
  const uploadSingleFile = multer({ storage: storage }).single("csvFile");
  uploadSingleFile(req, res, async (error) => {
    if (error) {
      return res.status(500).json({
        EC: 1,
        message: "upload file unsucess",
        error: JSON.stringify(error),
      });
    } else {
      const fileCsvPath = path.join(filePath, req.file.originalname);
      //convert data csv to json
      const dataConvert = await csv().fromFile(fileCsvPath);
      const insertData = await Product.insertMany(dataConvert);
      res.status(200).json({
        EC: 0,
        message: "upload sucess",
        data: insertData,
      });
    }
  });
};
const handleUpdateStock = async (idProduct) => {
  try {
    //Multiple Product
    if (Array.isArray(idProduct)) {
      for (let i = 0; i < idProduct.length; i++) {
        const product = await Product.findById(idProduct[i]);
        const currentStock = Number(product.quantityInstock) - 1;
        const updateStock = currentStock.toString();
        await Product.findByIdAndUpdate(idProduct[i], {
          quantityInstock: updateStock,
        });
      }
      //Single Product
    } else {
      const product = await Product.findById(idProduct);
      const currentStock = Number(product.quantityInstock) - 1;
      const updateStock = currentStock.toString();
      await Product.findByIdAndUpdate(idProduct, {
        quantityInstock: updateStock,
      });
    }
  } catch (error) {
    console.log("Error handleUpdateStock service", error);
  }
};
module.exports = {
  createProductService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  findProductService,
  findListProductByIdService,
  insertManyProductService,
  handleUpdateStock,
};
