import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    date: {
      // check how to store date in mongodb:
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tripCompleted: {
      type: Boolean,
      default: false,
    },
    img: {
      // take any one photo to display -> not there in current setup check if is required:
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
