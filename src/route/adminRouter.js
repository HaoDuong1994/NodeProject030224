const express = require("express");
const app = express();
const multer = require("multer");
const { adminImgStorage } = require("../service/uploadFileService");
const upload = multer({ storage: adminImgStorage });
const adminRouter = express.Router();
const {
  createAdminController,
  getAdminController,
  updateAdminController,
  uploadFileController,
  deleteAdminController,
  loginAdminController,
  adminLoginController,
  adminLogoutController,
} = require("../controller/adminController");
//Create admin
adminRouter.post(
  "/create-admin",
  upload.single("avatar"),
  createAdminController
);
//Admin login
adminRouter.post("/login", loginAdminController);
//Get admin
adminRouter.get("/", getAdminController);
//Update admin
adminRouter.put("/update-admin", updateAdminController);
adminRouter.post("/update-admin", updateAdminController);
//Uploaf file
adminRouter.post("/file", uploadFileController);
//Delete admin
adminRouter.delete("/delete-admin", deleteAdminController);
//Admin login page
adminRouter.post("/admin-login", adminLoginController);
//Admin logout
adminRouter.post("/admin-logout", adminLogoutController);
module.exports = adminRouter;
