import React from "react";
import styled from "styled-components";
import HotelCardLoader from "./HotelCardLoader";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const SearchHotelListLoader = () => {
  return (
    <Container>
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
      <HotelCardLoader />
    </Container>
  );
};

export default SearchHotelListLoader;
