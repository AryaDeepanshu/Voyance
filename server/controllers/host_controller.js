const Hotel = require("../models/Hotel");

module.exports.addHotel = async (req, res) => {
  if (!req.payload.host) return res.status(401).json("Not Authorized");

  const hotelDetail = req.body;
  const hotel = new Hotel(hotelDetail);

  try {
    const hotelAdded = await hotel.save();
    return res.status(200).json(hotelAdded);
  } catch (Error) {
    return res.status(401).json(`can't Add Hotel: ${Error}`);
  }
};

module.exports.getHotel = async (req, res) => {
  const hotelId = req.params.id;
  console.log(hotelId);

  try {
    const hotel = await Hotel.findById(hotelId);
    console.log(hotel);
    return res.status(200).json(hotel);
  } catch (Error) {
    return res.status(401).json(`can't Get Hotel: ${Error}`);
  }
};

module.exports.updateHotel = async (req, res) => {
  // Need to be redefined for the version - 2 of our project.
  // -> basically person requesting for update of the property is also the owner of the property.
  if (!req.payload.host) return res.status(401).json("Not Authorized");

  const data = req.body;
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findByIdAndUpdate(hotelId, data, { new: true });
    return res.status(200).json(hotel);
  } catch (Error) {
    return res.status(401).json(`can't update Hotel: ${Error}`);
  }
};
