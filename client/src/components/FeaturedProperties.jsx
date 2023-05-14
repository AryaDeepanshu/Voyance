import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";

import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";

import HotelCard from "./HotelCard";
import CategorySlider from "./CategorySlider";
import FeaturedPropertiesLoader_X3 from "./Loaders/FeaturedPropertiesLoader_X3";
import FeaturedPropertiesLoader_X4 from "./Loaders/FeaturedPropertiesLoader_X4";

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
  font-family: "Montserrat", sans-serif;
  padding: 40px 0px 20px 0px;
  font-family: "Bree Serif", serif;
`;

const Wrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-bottom: 20px;
`;

function FeaturedProperties({ home }) {
  const { width } = useWindowDimensions();
  const visible = width >= 980 && width < 1315;

  // Logic for handling the state of selection property type:
  // category -> cantain the type of property to be fetched from DB.
  const [category, setCategory] = useState("");

  /* Fetching Hotel Information using React Query: */
  const {
    isLoading: hotelLoading,
    error: hotelError,
    data: hotelData,
    refetch,
  } = useQuery([`featured-hotel-${category}`], () =>
    axiosBaseURL
      .get(`hotel/featured-hotel?category=${category}`)
      .then((featured_hotel) => {
        return featured_hotel.data;
      })
  );

  /* Fetching user wishlist using Redux: */
  const { wishlist } = useSelector((store) => store.wishlist);

  useEffect(() => {
    refetch();
  }, [category]);

  const colorHandler = (_id) => {
    const index = wishlist.indexOf(_id);
    return index === -1 ? "white" : "red";
  };

  return (
    <Container>
      <Heading>Featured Properties</Heading>
      <CategorySlider
        category={category}
        setCategory={setCategory}
        home={home}
      />

      <Wrapper>
        {hotelLoading ? (
          visible ? (
            <FeaturedPropertiesLoader_X3 />
          ) : (
            <FeaturedPropertiesLoader_X4 />
          )
        ) : (
          <>
            {visible
              ? hotelData?.map(
                  (hotelInfo, index) =>
                    index !== 3 && (
                      <HotelCard
                        key={index}
                        hotelInfo={hotelInfo}
                        color={colorHandler(hotelInfo._id)}
                      />
                    )
                )
              : hotelData?.map((hotelInfo, index) => (
                  <HotelCard
                    key={index}
                    hotelInfo={hotelInfo}
                    color={colorHandler(hotelInfo._id)}
                  />
                ))}
          </>
        )}
      </Wrapper>
    </Container>
  );
}

export default FeaturedProperties;
