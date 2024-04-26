import mongoose from "mongoose";
const mongooseDelete = require("mongoose-delete");
const { isEmail } = require("validator");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: [isEmail, "Please enter valid email"],
    },
    role: {
      type: String,
      default: "Admin",
    },
    address: String,
    phone: String,
    password: {
      type: String,
      required: [true, "Please enter password"], // if false the second value will display to user
      select: true, // hide password on display
    },

    image: [String],
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    roleId: String,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
adminSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
