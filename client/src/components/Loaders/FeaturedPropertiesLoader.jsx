import React from "react";
import styled from "styled-components";
import HotelCardLoader from "./HotelCardLoader";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const FeaturedPropertiesLoader = ({ visible }) => {
  return (
    <Container>
      {Array(4)
        .fill("")
        .map(
          (_, index) =>
            (!visible || index !== 3) && <HotelCardLoader key={index} />
        )}
    </Container>
  );
};

export default FeaturedPropertiesLoader;
