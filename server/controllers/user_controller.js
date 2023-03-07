const User = require("../models/User");

module.exports.updateInfo = async (req, res) => {
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
    return res.status(400).json(Err);
  }
};
