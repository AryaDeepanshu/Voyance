import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HotelListData } from "../data/HotelListData";
import HotelCard from "./HotelCard";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const HotelList = ({ hotel_data }) => {
  /* Fetching user wishlist using Redux: */
  const { wishlist } = useSelector((store) => store.wishlist);

  const colorHandler = (_id) => {
    const index = wishlist.indexOf(_id);
    return index === -1 ? "white" : "red";
  };

  return (
    <Container>
      <>
        {hotel_data.map((hotelInfo, index) => (
          <HotelCard
            hotelInfo={hotelInfo}
            key={index}
            color={colorHandler(hotelInfo._id)}
          />
        ))}
      </>
    </Container>
  );
};

export default HotelList;
