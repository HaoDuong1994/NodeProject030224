const express = require("express");
const multer = require("multer");
const app = express();
const adminImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/Img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const userImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/ImgUser");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
module.exports = {
  adminImgStorage,
  userImgStorage,
};
