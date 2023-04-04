const User = require("../models/User");
const Hotel = require("../models/Hotel");
const Review = require("../models/Review");

module.exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.find({ hotelId: req.params.id }).populate(
      "userId"
    );
    return res.status(200).json(review);
  } catch (Err) {
    console.log(`Can't get hotel reviews : ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.addReview = async (req, res) => {
  if (req.payload.host) return res.status(403).json("Host cannot add review");

  const existingReview = await Review.find({ userId: req.payload.id });
  if (existingReview.length !== 0)
    return res.status(406).json("review already exist");

  const review = new Review({
    ...req.body,
    userId: req.payload.id,
  });

  try {
    const savedReview = await review.save();

    await User.findByIdAndUpdate(req.payload.id, {
      $push: { reviews: savedReview._id },
    });

    await Hotel.findByIdAndUpdate(req.body.hotelId, {
      $inc: { totalStars: 5, starNumber: req.body.star },
      $push: { reviews: savedReview._id },
    });

    return res.status(200).json("Successfully added the review");
  } catch (Err) {
    console.log(`Can't add review: ${Err}`);
    return res.status(500).json(Err);
  }
};
