var multer = require("multer");
const {
  createProductService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  findProductService,
  insertManyProductService,
} = require("../service/productService");
const createProductController = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).json({
      EC: 0,
      message: "Create data sucess",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
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
const createManyProductController = async (req, res) => {
  try {
    await insertManyProductService(req, res);
  } catch (error) {
    res.status(200).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
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
  createManyProductController,
};
