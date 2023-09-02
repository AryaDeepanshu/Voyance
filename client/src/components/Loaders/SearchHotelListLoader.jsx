import React from "react";
import styled from "styled-components";
import HotelCardLoader from "./HotelCardLoader";
import { largeMobile } from "../../utils/responsive";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  ${largeMobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}
`;

const SearchHotelListLoader = () => {
  return (
    <Container>
      {Array.from({ length: 8 }, (_, i) => i).map((index) => (
        <HotelCardLoader key={index} />
      ))}
    </Container>
  );
};

export default SearchHotelListLoader;
