import React, { useState } from "react";
import styled from "styled-components";
import HotelCardLoader from "./HotelCardLoader";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const FeaturedPropertiesLoader_X4 = () => {
  return (
    <Container>
      {Array(4)
        .fill(Math.random())
        .map((val, index) => (
          <HotelCardLoader key={index} />
        ))}
    </Container>
  );
};

export default FeaturedPropertiesLoader_X4;
