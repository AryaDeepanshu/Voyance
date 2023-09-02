const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    beginDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      type: Number,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
