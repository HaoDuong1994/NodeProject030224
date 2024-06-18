import mongoose from "mongoose";
const mongooseDelete = require("mongoose-delete");
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    roleId: String, //0
    orderInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    cartInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
customerSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
