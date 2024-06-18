import mongoose, { SchemaType } from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    //
    receiverName: {
      type: String,
      required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    totalPrice: String,
    paymentMethod: {
      type: String,
      enum: ["Card", "COD"],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    orderConfirm: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
