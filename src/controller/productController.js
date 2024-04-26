const {
  createProductService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  findProductService,
} = require("../service/productService");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../service/uploadFileService");
const createProductController = async (req, res) => {
  try {
    //
    if (req.files) {
      let imgUrl = "";
      let resultFileUpload = await uploadSingleFile(req.files.img);
      imgUrl = resultFileUpload.path;
      req.body.img = imgUrl;
      console.log("req.body>>>>>", req.body);
      const resultProduct = await createProductService(req.body);
      res.status(200).json({
        EC: 0,
        dataCreated: resultProduct,
      });
    } else {
      const data = await createProductService(req.body);
      res.status(200).json({
        EC: 0,
        data: data,
      });
    }
  } catch (error) {
    //
    res.status(200).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
const getAllProductController = async (req, res) => {
  try {
    const result = await getAllProductService(req.query);
    res.status(200).json({ EC: 0, data: result });
  } catch (error) {
    res.status(400).json({
      EC: 0,
      message: JSON.stringify(error),
    });
  }
};
const updateProductController = async (req, res) => {
  try {
    const result = await updateProductService(req.body);
    if (result) {
      delete req.body.id;
      return res
        .status(200)
        .json({ EC: 0, message: "update success", data: req.body });
    }
  } catch (error) {
    return res.json({
      EC: 1,
      error: JSON.stringify(error),
    });
  }
};
const deleteProductController = async (req, res) => {
  const result = await deleteProductService(req.body.id);
  res.status(200).json({
    EC: 0,
    message: result,
  });
};

// Product page controller

const getAllProductPage = async (req, res) => {
  const product = await findProductService(req.params.id);
  res.render("editProductPage.ejs", { product: product });
};
module.exports = {
  createProductController,
  getAllProductController,
  updateProductController,
  deleteProductController,
  getAllProductPage,
};
