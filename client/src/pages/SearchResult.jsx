import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchHotelList from "../components/SearchHotelList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SearchResult = () => {
  const location = useLocation();

  const [room, setRoom] = useState(0);
  const [property, setProperty] = useState(0);
  const [rating, setRating] = useState(0);

  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(25000);
  const [essentials, setEssentials] = useState([]);
  const [meals, setMeals] = useState([]);

  const { isLoading, error, data, refetch } = useQuery([location.search], () =>
    axios
      // .get(`http://localhost:5000/hotel/search${location.search}`)
      .get(
        `http://localhost:5000/hotel/search${location.search}&min=${minimumPrice}&max=${maximumPrice}`
      )
      .then((hotels) => {
        return hotels.data;
      })
  );
  console.log(data);
  // console.log(`room: ${room}`);
  // console.log(`propertyType: ${propertyArray[property]}`);
  // console.log(`essentials: ${essentials}`);
  // console.log(`mealIncluded: ${meals}`);
  // console.log(`rating: ${rating}`);

  useEffect(() => {
    refetch();
  }, [minimumPrice, maximumPrice]);

  return (
    <>
      <Navbar />
      <Filter
        room={room}
        setRoom={setRoom}
        property={property}
        setProperty={setProperty}
        rating={rating}
        setRating={setRating}
        minimumPrice={minimumPrice}
        setMinimumPrice={setMinimumPrice}
        maximumPrice={maximumPrice}
        setMaximumPrice={setMaximumPrice}
        essentials={essentials}
        setEssentials={setEssentials}
        meals={meals}
        setMeals={setMeals}
      />
      {isLoading ? <>Loading...</> : <SearchHotelList hotel_data={data} />}
      <Footer />
    </>
  );
};

export default SearchResult;
