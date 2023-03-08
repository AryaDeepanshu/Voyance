const Hotel = require("../models/Hotel")
const SearchHotel = async (req, res) => {
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
        apiData = apiData.where("cost").gte(min).lte(max);
    }
    const myData = await apiData;
    res.status(200).json(myData);
}

module.exports = SearchHotel;