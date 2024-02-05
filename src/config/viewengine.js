const path = require("path");
import express from "express";
const viewEngine = require("view-engine");
const configViewEngine = (app, link) => {
  app.use(express.static("./src/public"));
  //config view engine ở mục nào
  app.set("views", path.join(link, "/views")); // function( tên thư mục, tên đường dẫn thư mục)
  // định nghĩa loại view engine là loại ejs
  app.set("view engine", "ejs");
};
module.exports = configViewEngine;
