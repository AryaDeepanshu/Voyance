import React from "react";
import styled from "styled-components";
import { desktop } from "../responsive";
import {
  CalendarMonthOutlined,
  CalendarViewMonthRounded,
  CurrencyRupee,
  Star,
} from "@mui/icons-material";

const TripCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

const TripCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid lightgray;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  }
`;

const HotelNameWrapper = styled.div``;

const HotelName = styled.p`
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;

  ${desktop({
    fontSize: "24px",
  })}
`;

const HotelDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HotelAddress = styled.p`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0px;
  color: gray;
  ${desktop({
    fontSize: "16px",
  })};
`;

const HotelRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  color: gray;
  ${desktop({
    fontSize: "16px",
  })};
`;

const HotelDescription = styled.div`
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  padding: 0px 2px;
  color: gray;
  ${desktop({
    fontSize: "16px",
  })};
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;

const Date = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${desktop({
    fontSize: "18px",
  })}
`;

const Cost = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${desktop({
    fontSize: "18px",
  })}
`;

const TripCard = () => {
  const TripData = [
    {
      name: "Whispering Pines Cottages|Treehouse|Tandi",
      address: "Jibhi, Himachal Pradesh, India",
      rating: "4.69",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia minus provident, id eius quas est saepe porro minima voluptatem alias ipsam quidem animi ipsa dolor officia non suscipit ut.",
      date: "18thfeb - 24th feb",
      cost: "17,000",
    },
    {
      name: "Whispering Pines Cottages|Treehouse|Tandi",
      address: "Jibhi, Himachal Pradesh, India",
      rating: "4.69",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia minus provident, id eius quas est saepe porro minima voluptatem alias ipsam quidem animi ipsa dolor officia non suscipit ut.",
      date: "18thfeb - 24th feb",
      cost: "17,000",
    },
    {
      name: "Whispering Pines Cottages|Treehouse|Tandi",
      address: "Jibhi, Himachal Pradesh, India",
      rating: "4.69",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia minus provident, id eius quas est saepe porro minima voluptatem alias ipsam quidem animi ipsa dolor officia non suscipit ut.",
      date: "18thfeb - 24th feb",
      cost: "17,000",
    },
    {
      name: "Whispering Pines Cottages|Treehouse|Tandi",
      address: "Jibhi, Himachal Pradesh, India",
      rating: "4.69",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia minus provident, id eius quas est saepe porro minima voluptatem alias ipsam quidem animi ipsa dolor officia non suscipit ut.",
      date: "18thfeb - 24th feb",
      cost: "17,000",
    },
  ];
  return (
    <TripCardWrapper>
      {TripData.map((trip, index) => (
        <TripCardContainer key={index}>
          <HotelNameWrapper>
            <HotelName>{trip.name}</HotelName>
            <HotelDetailWrapper>
              <HotelAddress>{trip.address}</HotelAddress>
              <HotelRating>
                <Star style={{ transform: "scale(0.7)" }} /> {trip.rating}
              </HotelRating>
            </HotelDetailWrapper>
          </HotelNameWrapper>
          <HotelDescription>{trip.description}</HotelDescription>
          <DetailContainer>
            <Date>
              <CalendarMonthOutlined style={{ transform: "scale(0.9)" }} />
              {trip.date}
            </Date>
            <Cost>
              <CurrencyRupee style={{ transform: "scale(0.7)" }} />
              {trip.cost}
            </Cost>
          </DetailContainer>
        </TripCardContainer>
      ))}
    </TripCardWrapper>
  );
};

export default TripCard;
