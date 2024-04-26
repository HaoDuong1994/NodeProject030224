import mongoose, { model } from "mongoose";
const historyOrderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    idOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);
const HistoryOrder = mongoose.model("HistoryOrder", historyOrderSchema);
model.exports = HistoryOrder;
