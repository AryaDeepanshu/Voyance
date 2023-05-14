const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    peopleRated: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    guest: {
      type: Number,
      default: 0,
    },
    lat: {
      type: Number,
      default: 0,
    },
    long: {
      type: Number,
      default: 0,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    beds: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    propertyType: {
      type: [String],
      required: true,
    },
    mealIncluded: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);
