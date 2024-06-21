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
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    phone: String,
    password: {
      type: String,
      required: [true, "Please enter password"], // if false the second value will display to user
      select: true, // hide password on display
      minLength: [4, "Minimum 4 character"],
    },

    image: {
      type: String,
      required: [true, "Please enter your password"],
    },
    gender: {
      type: String,
      require: [true, "Please choose your gender"],
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
