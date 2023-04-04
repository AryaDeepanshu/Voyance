import axios from "axios";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SearchHotelList from "../components/SearchHotelList";

const SearchResult = () => {
  const searchInfo = useSelector((store) => store.filterAndSearch);

  /* we need filter and category state in this component to basically handle the refetch() operation: */
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const { location, minPrice, maxPrice, rating, essentials, mealIncluded } =
    searchInfo;

  const { isLoading, error, data, refetch } = useQuery([location], () =>
    axios
      .get(
        `http://localhost:5000/hotel/search?location=${location}&propertyType=${category}&min=${minPrice}&max=${maxPrice}&amenities=${essentials}&mealIncluded=${mealIncluded}&rating=${rating} `
      )
      .then((hotels) => {
        return hotels.data;
      })
  );

  useEffect(() => {
    refetch();
  }, [modal, category, refetch]);

  return (
    <>
      <Navbar />
      <Filter
        category={category}
        setCategory={setCategory}
        modal={modal}
        setModal={setModal}
      />
      {isLoading ? <>Loading...</> : <SearchHotelList hotel_data={data} />}
      <Footer />
    </>
  );
};

export default SearchResult;
