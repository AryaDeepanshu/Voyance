import axios from "axios";
import { useState } from "react";
import HotelCard from "./HotelCard";
import styled from "styled-components";
import CategorySlider from "./CategorySlider";
import { useQuery } from "@tanstack/react-query";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useEffect } from "react";

const Container = styled.div`
  height: max-content;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const Heading = styled.h1`
  font-family: "Montserrat", sans-serif;
  padding: 40px 0px 20px 0px;
`;

const Wrapper = styled.div`
  width: 95%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-bottom: 20px;
`;

function FeaturedProperties() {
  const { width } = useWindowDimensions();
  const visible = width > 980 && width < 1315;

  // Logic for handling the state of selection property type:
  // category -> cantain the type of property to be fetched from DB.
  const [category, setCategory] = useState("");

  /* Fetching Data using React Query: */
  const { isLoading, error, data, refetch } = useQuery(["featured-hotel"], () =>
    axios
      .get(`http://localhost:5000/hotel/featured-hotel?category=${category}`)
      .then((featured_hotel) => {
        return featured_hotel.data;
      })
  );

  useEffect(() => {
    refetch();
  }, [category]);

  return (
    <Container>
      <Heading>Featured Properties</Heading>
      <CategorySlider category={category} setCategory={setCategory} />
      <Wrapper>
        {!visible &&
          data?.map((hotelInfo, index) => (
            <HotelCard key={index} hotelInfo={hotelInfo} />
          ))}

        {visible &&
          data?.map(
            (hotelInfo, index) =>
              index !== 3 && <HotelCard key={index} hotelInfo={hotelInfo} />
          )}
      </Wrapper>
    </Container>
  );
}

export default FeaturedProperties;
