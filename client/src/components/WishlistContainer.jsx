import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeMobile, mobile } from "../utils/responsive";

import HotelCard from "./HotelCard";
import SearchHotelListLoader from "./Loaders/SearchHotelListLoader";
import { axiosBaseURL } from "../utils/axiosBaseURL";

const Container = styled.div``;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Heading = styled.div`
  font-size: 48px;
  margin-left: 10px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "32px",
    margin: "1% 0% 0% 6%",
  })}

  ${largeMobile({
    fontSize: "36px",
    margin: "1% 0% 0% 5%",
  })}
`;

const WishlistContainer = () => {
  const [hotelList, setHotelList] = useState([]);
  const { wishlist } = useSelector((store) => store.wishlist);
  const wishlisted = [...wishlist];

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getWishList = async () => {
      const data = await Promise.all(
        wishlisted.map(async (wish) => {
          const response = await axiosBaseURL.get(`hotel/info/${wish}`);
          return response.data;
        })
      );

      setHotelList(data);
      setIsLoading(false);
    };

    getWishList();
  }, []);

  return (
    <Container>
      <Heading>Your Wishlist:</Heading>
      {isLoading ? (
        <SearchHotelListLoader />
      ) : (
        <Wrapper>
          {hotelList.map((hotelInfo) => (
            <HotelCard key={hotelInfo._id} hotelInfo={hotelInfo} color="red" />
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default WishlistContainer;
