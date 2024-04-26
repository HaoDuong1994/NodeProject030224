const express = require("express");
const app = express();
const adminRouter = express.Router();
const {
  createAdminController,
  getAdminController,
  updateAdminController,
  uploadFileController,
  deleteAdminController,
  loginAdminController,
  adminLoginController,
} = require("../controller/adminController");
//Create admin
adminRouter.post("/create-admin", createAdminController);
//Admin login
adminRouter.post("/login", loginAdminController);
//Get admin
adminRouter.get("/", getAdminController);
//Update admin
adminRouter.put("/update-admin", updateAdminController);
//Uploaf file
adminRouter.post("/file", uploadFileController);
//Delete admin
adminRouter.delete("/delete-admin", deleteAdminController);
//Admin login page
adminRouter.post("/admin-login", adminLoginController);
module.exports = adminRouter;
