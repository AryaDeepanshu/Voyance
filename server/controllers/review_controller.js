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
  if (!req.payload) return res.status(401).json("You are not authenticated.");
  if (req.payload.host) return res.status(403).json("Host cannot add review.");

  const existingReview = await Review.find({
    userId: req.payload.id,
    hotelId: req.body.hotelId,
  });

  if (existingReview.length !== 0)
    return res.status(406).json("review already exist.");

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
      $inc: { totalStars: 1, starNumber: req.body.star },
      $push: { reviews: savedReview._id },
    });

    return res.status(200).json("Successfully added the review.");
  } catch (Err) {
    console.log(`Can't add review: ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.updateReview = async (req, res) => {
  if (!req.payload) return res.status(401).json("You are not authenticated.");
  if (req.payload.id != req.body.userId)
    return res.status(401).json("Not Authorized");
  if (req.payload.host)
    return res.status(403).json("Host cannot update review.");

  const existingReview = await Review.find({
    userId: req.body.userId,
    hotelId: req.body.hotelId,
  });

  if (existingReview.length === 0)
    return res.status(406).json("No Existing review found.");

  try {
    await Hotel.findByIdAndUpdate(req.body.hotelId, {
      $inc: {
        starNumber: req.body.star - existingReview[0].star,
      },
    });

    await Review.findByIdAndUpdate(
      existingReview[0]._id,
      {
        $set: {
          star: req.body.star,
          review: req.body.review,
        },
      },
      { new: true }
    );

    return res.status(200).json("Successfully updated the review.");
  } catch (Err) {
    console.log(`Can't update review: ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.deleteReview = async (req, res) => {
  if (!req.payload) return res.status(401).json("You are not authenticated.");
  if (req.payload.id != req.body.userId)
    return res.status(401).json("Not Authorized");
  if (req.payload.host)
    return res.status(403).json("Host cannot delete review.");

  const existingReview = await Review.find({
    userId: req.body.userId,
    hotelId: req.body.hotelId,
  });

  if (existingReview.length === 0)
    return res.status(406).json("No Existing review found.");

  try {
    await User.findByIdAndUpdate(
      req.payload.id,
      {
        $pull: {
          reviews: existingReview[0]._id,
        },
      },
      { new: true }
    );

    await Hotel.findByIdAndUpdate(
      req.body.hotelId,
      {
        $inc: { totalStars: -1, starNumber: -existingReview[0].star },
        $pull: {
          reviews: existingReview[0]._id,
        },
      },
      { new: true }
    );

    await Review.findByIdAndDelete(existingReview[0]._id);
    return res.status(200).json("Successfully deleted the review.");
  } catch (Err) {
    console.log(`Can't delete review: ${Err}`);
    return res.status(500).json(Err);
  }
};
