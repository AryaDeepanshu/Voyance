const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    phone: {
      type: Number,
      max: 10,
    },
    host: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "default_avatar",
    },
    bio: {
      type: String,
    },
    wishlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Hotel",
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "PaymentModel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
