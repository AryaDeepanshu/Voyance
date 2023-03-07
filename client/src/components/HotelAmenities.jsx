import {
  Kitchen,
  Wifi,
  ChairAlt,
  LocalParking,
  Pets,
  SmokeFree,
  FireExtinguisher,
  LocalHospital,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

import { amenityList } from "../data/amenityList";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const Heading = styled.p`
  font-size: 36px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "24px",
  })}
`;

const AmenitiesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const AmenityConatiner = styled.div`
  display: flex;
  width: max-content;
  padding: 10px 0px;
`;

const AmenityTitle = styled.p`
  padding-left: 15px;
  color: #2a2a2a;
  font-size: 17px;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  ${mobile({
    fontSize: "14px",
  })}
`;

const HotelAmenities = ({ data }) => {
  const [hotelAmenities, setHotelAmenities] = useState([]);

  useEffect(() => {
    const setAmenities = () => {
      const arr = amenityList.filter(
        (amenity) => data.amenities.indexOf(amenity.label) != -1
      );
      setHotelAmenities(arr);
    };

    setAmenities();
  }, []);

  return (
    <Container>
      <Heading>What this place offers:</Heading>
      <AmenitiesWrapper>
        {hotelAmenities.map((item, index) => (
          <AmenityConatiner key={index}>
            {item.icon}
            <AmenityTitle>{item.label}</AmenityTitle>
          </AmenityConatiner>
        ))}
      </AmenitiesWrapper>
    </Container>
  );
};

export default HotelAmenities;
