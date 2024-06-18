import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantityInstock: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["shirt", "pants"],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
