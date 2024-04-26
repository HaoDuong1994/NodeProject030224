import mongoose from "mongoose";
const testSchme = new mongoose.Schema({
  name: String,
});

const testModel = mongoose.model("Model", testSchme);
module.exports = testModel;
