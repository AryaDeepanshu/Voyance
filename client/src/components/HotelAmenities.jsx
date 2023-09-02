import { useEffect, useState } from "react";
import styled from "styled-components";
import { desktop, mobile } from "../utils/responsive";

import { amenityList } from "../data/amenityList";

const Heading = styled.p`
  font-size: 36px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "24px",
  })}
`;

const Wrapper = styled.div`
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

  ${desktop({
    width: "90%",
  })}
`;

const Container = styled.div`
  gap: 10px;
  width: 80%;
  display: flex;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
`;

const Icon = styled.div``;

const Label = styled.p`
  font-size: 16px;
  font-family: "Roboto", sans-serif;
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
    <>
      <Heading>What this place offers:</Heading>

      <Wrapper>
        {hotelAmenities.map((item, index) => (
          <Container key={index}>
            <Icon>{item.icon}</Icon>
            <Label>{item.label}</Label>
          </Container>
        ))}
      </Wrapper>
    </>
  );
};

export default HotelAmenities;
