import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";

import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";

import HotelCard from "./HotelCard";
import OptionSlider from "./OptionSlider";
import FeaturedPropertiesLoader from "./Loaders/FeaturedPropertiesLoader";
import { largeMobile, mobile } from "../utils/responsive";

const Container = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: "Bree Serif", serif;
  padding: 40px 0px 20px 0px;

  ${largeMobile({
    fontSize: "32px",
  })}

  ${mobile({
    fontSize: "28px",
  })}
`;

const Wrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-bottom: 20px;
`;

function FeaturedProperties({ home }) {
  const { width } = useWindowDimensions();
  const visible = width >= 950 && width < 1315;

  /* Logic for handling the state of selection property type: */
  const [category, setCategory] = useState("");

  /* Fetching Hotel Information using React Query: */
  const { isLoading, data, refetch } = useQuery(
    [`featured-hotel-${category}`],
    () =>
      axiosBaseURL
        .get(`hotel/featured-hotel?category=${category}`)
        .then((featured_hotel) => {
          return featured_hotel.data;
        })
  );

  useEffect(() => {
    refetch();
  }, [refetch, category]);

  return (
    <Container>
      <Heading>Featured Accomodations</Heading>
      <OptionSlider category={category} setCategory={setCategory} />

      <Wrapper>
        {isLoading ? (
          <FeaturedPropertiesLoader visible={visible} />
        ) : (
          <>
            {data?.map(
              (hotelInfo, index) =>
                (!visible || index !== 3) && (
                  <HotelCard hotelInfo={hotelInfo} key={hotelInfo?._id} />
                )
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
}

export default FeaturedProperties;
