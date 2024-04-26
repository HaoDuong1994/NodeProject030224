import mongoose from "mongoose";
require("dotenv").config();
const dbState = [
  {
    // tạo state trạng thái kết nối
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];
const connection = async () => {
  try {
    let options = {
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(process.env.DB_HOST, options);
    //check trạng thái kết nối
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to db");
  } catch (error) {
    console.log("error in config connection to database", error);
  }
};
module.exports = connection;
