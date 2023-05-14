const User = require("../models/User");

module.exports.updateInfo = async (req, res) => {
  if (req.params.id != req.payload.id)
    return res.status(401).json("Not Authorized!");

  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(500).json("No user with given Id found.");

    if (req.payload.id !== user._id.toString())
      return res
        .status(401)
        .json("You are not authorized to perform that action.");

    const updatedInfo = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).json(updatedInfo);
  } catch (Err) {
    console.log(`Error updating user information: ${Err}`);
    return res.status(500).json(Err);
  }
};

module.exports.saveWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.payload.id,
      {
        $set: {
          wishlist: req.body.wishlist,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json(user);
  } catch (Err) {
    console.log(`Error getting wishlist: ${Err}`);
    return res.status(500).json(Err);
  }
};
