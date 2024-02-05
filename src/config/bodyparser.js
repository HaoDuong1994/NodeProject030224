import express from "express";
import bodyParser from "body-parser";
const configBodyParser = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
module.exports = configBodyParser;
