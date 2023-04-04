import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeMobile, mobile } from "../responsive";

import HotelCard from "./HotelCard";

const Heading = styled.div`
  font-size: 48px;
  margin: 1% 0% 0% 4%;
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

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 0% 3% 0% 3%;
`;

const WishlistContainer = () => {
  const [hotelList, setHotelList] = useState([]);
  const { wishlist } = useSelector((store) => store.wishlist);
  const wishlisted = [...wishlist];

  useEffect(() => {
    const getWishList = async () => {
      const data = await Promise.all(
        wishlisted.map(async (wish) => {
          const response = await axios.get(
            `http://localhost:5000/hotel/info/${wish}`
          );
          return response.data;
        })
      );

      setHotelList(data);
    };

    getWishList();
  }, []);

  return (
    <>
      <Heading>Your Wishlist:</Heading>
      {
        <Wrapper>
          {hotelList.map((hotelInfo) => (
            <HotelCard key={hotelInfo._id} hotelInfo={hotelInfo} color="red" />
          ))}
        </Wrapper>
      }
    </>
  );
};

export default WishlistContainer;
