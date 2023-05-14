import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SearchHotelList from "../components/SearchHotelList";
import SearchHotelListLoader from "../components/Loaders/SearchHotelListLoader";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { axiosBaseURL } from "../utils/axiosBaseURL";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
`;

const SearchResult = () => {
  const searchInfo = useSelector((store) => store.filterAndSearch);

  /* we need filter and category state in this component to basically handle the refetch() operation: */
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");
  const { location, minPrice, maxPrice, rating, essentials, mealIncluded } =
    searchInfo;

  const { isLoading, error, data, refetch } = useQuery([location], () =>
    axiosBaseURL
      .get(
        `hotel/search?location=${location}&propertyType=${category}&min=${minPrice}&max=${maxPrice}&amenities=${essentials}&mealIncluded=${mealIncluded}&rating=${rating} `
      )
      .then((hotels) => {
        return hotels.data;
      })
  );

  useEffect(() => {
    refetch();
  }, [modal, category, refetch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <Filter
          category={category}
          setCategory={setCategory}
          modal={modal}
          setModal={setModal}
        />
        {isLoading ? (
          <SearchHotelListLoader />
        ) : (
          <SearchHotelList hotel_data={data} />
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchResult;
