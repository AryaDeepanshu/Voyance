import React from "react";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchHotelList from "../components/SearchHotelList";

const SearchResult = () => {
  return (
    <>
      <Navbar />
      <Filter />
      <SearchHotelList />
      <Footer />
    </>
  );
};

export default SearchResult;
