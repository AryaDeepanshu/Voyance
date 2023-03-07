const Hotel = require("../models/Hotel");

module.exports.featured_hotel = async (req, res) => {
  // console.log(req.query.category);
  try {
    const hotel = await Hotel.find({}).sort({ updatedAt: -1 }).limit(4);

    // console.log(hotel);
    return res.status(200).json(hotel);
  } catch (Err) {
    console.log(`Error in fetching Featured Hotel : ${Err}`);
    return res.status(400).json(Err);
  }
};

module.exports.info = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    return res.status(200).json(hotel);
  } catch (Err) {
    console.log(`Error fetching individual hotel detail : ${Err}`);
    return res.status(400).json(Err);
  }
};
