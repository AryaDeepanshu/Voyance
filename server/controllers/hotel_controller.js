const Hotel = require("../models/Hotel");

module.exports.featured_hotel = async (req, res) => {
  try {
    const query =
      req.query.category !== "" ? { propertyType: req.query.category } : {};
    const hotel = await Hotel.find(query).sort({ updatedAt: -1 }).limit(4);

    return res.status(200).json(hotel);
  } catch (Err) {
    console.log(`Error in fetching Featured Hotel : ${Err}`);
    return res.status(400).json(Err);
  }
};

module.exports.info = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id)
      .populate("reviews")
      .populate("hostId");
    return res.status(200).json(hotel);
  } catch (Err) {
    console.log(`Error fetching individual hotel detail : ${Err}`);
    return res.status(400).json(Err);
  }
};

module.exports.search = async (req, res) => {
  const query = req.query;

  try {
    const filter = {
      ...((query.max || query.min) && {
        cost: {
          ...(query.min && { $gt: query.min }),
          ...(query.max && { $lt: query.max }),
        },
      }),
      ...(query.location && {
        location: { $regex: query.location, $options: "i" },
      }),
      ...(query.propertyType && {
        propertyType: query.propertyType,
      }),
      /* rating is a revied property: */
      // ...(query.rating && {
      // rating: { $gt: query.rating },
      // }),
      ...(query.mealIncluded && {
        mealIncluded: { $all: query.mealIncluded.split(",") },
      }),
      ...(query.amenities && {
        amenities: { $all: query.amenities.split(",") },
      }),
    };

    const hotels = await Hotel.find(filter);
    return res.status(200).json(hotels);
  } catch (Err) {
    console.log(`Error fetching hotel : ${Err}`);
    return res.status(500).json(Err);
  }
};
