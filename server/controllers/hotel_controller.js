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

module.exports.search = async (req, res) => {
  const query = req.query;

  try {
    const { name, totalStars, starNumber, cost, location, amenities, guest, bedrooms, beds, bathrooms, propertyType, mealIncluded, reviews, sort, max, min } = req.query; 
    const quertObject = {};
      if(name){
          quertObject.name = name;
      }
      if(totalStars){
          quertObject.totalStars = totalStars;
      }
      if(starNumber){
          quertObject.starNumber = starNumber;
      }
      if(cost){
          quertObject.cost = cost;
      }
      if(location){
          quertObject.location = { $regex: location, $options: "i" };
      }
      if(amenities){
          quertObject.amenities = amenities;
      }
      if(guest){
          quertObject.guest = guest;
      }
      if(bedrooms){
          quertObject.bedrooms = bedrooms;
      }
      if(beds){
          quertObject.beds = beds;
      }
      if(bathrooms){
          quertObject.bathrooms = bathrooms;
      }
      if(propertyType){
          quertObject.propertyType = propertyType;
      }
      if(mealIncluded){
          quertObject.mealIncluded = mealIncluded;
      }
      if(reviews){
          quertObject.reviews = reviews;
      }

      let apiData = Hotel.find(quertObject);
      if(sort){
          let sortFix = sort.replace(",", " ");
          apiData = apiData.sort(sortFix);
      }
      if(min && max){
          apiData = apiData.where("cost").gte(min[0]).lte(max[0]);
      }
      const myData = await apiData;
    return res.status(200).json(myData);
  } catch (Err) {
    console.log(`Error fetching hotel : ${Err}`);
    return res.status(500).json(Err);
  }
};