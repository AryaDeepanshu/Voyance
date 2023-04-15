import React from "react";
import styled from "styled-components";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import {
  CalendarMonthOutlined,
  CurrencyRupee,
  Grid3x3,
  ReceiptOutlined,
  Star,
} from "@mui/icons-material";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  margin: 20px 0px 50px 0px;
`;

const TripCardWrapper = styled.div`
  display: flex;
  height: 250px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid lightgray;

  ${tablet({
    height: "200px",
  })};

  ${largeMobile({
    height: "max-content",
  })}

  ${mobile({
    height: "max-content",
  })}
`;

const TripCardImg = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 20px 0px 0px 20px;
`;

const TripCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
`;

const HotelNameWrapper = styled.div``;

const HotelName = styled.p`
  font-size: 24px;
  font-family: "Bree Serif", serif;

  ${desktop({
    fontSize: "28px",
  })}
`;

const HotelDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HotelAddress = styled.p`
  font-size: 16px;
  font-family: "Bree Serif", serif;
  padding: 10px 0px;
  color: gray;
  ${desktop({
    fontSize: "18px",
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

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Detail = styled.p`
  font-family: "Noto Serif", serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${desktop({
    fontSize: "18px",
  })}
`;

const TripCard = () => {
  const { width } = useWindowDimensions();
  // console.log(width);

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
    <Wrapper>
      {TripData.map((trip) => (
        <TripCardWrapper>
          {width > 660 && (
            <TripCardImg>
              <Img src="https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
            </TripCardImg>
          )}
          <TripCardContainer>
            <HotelNameWrapper>
              <HotelName>Whispering Pines Cottages|Treehouse|Tandi</HotelName>
              <HotelDetailWrapper>
                <HotelAddress>Jibhi, Himachal Pradesh, India</HotelAddress>
                <HotelRating>
                  <Star style={{ transform: "scale(0.7)" }} /> 4.69
                </HotelRating>
              </HotelDetailWrapper>
            </HotelNameWrapper>

            <BottomWrapper>
              <OrderDetailContainer>
                <Detail>
                  <ReceiptOutlined
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  #$12SA21AF45
                </Detail>
                <Detail>
                  <Grid3x3
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  #$12SA21AF45
                </Detail>
              </OrderDetailContainer>
              <DetailContainer>
                <Detail>
                  <CalendarMonthOutlined
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  18thfeb - 24th feb
                </Detail>
                <Detail>
                  <CurrencyRupee
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  17,000
                </Detail>
              </DetailContainer>
            </BottomWrapper>
          </TripCardContainer>
        </TripCardWrapper>
      ))}
    </Wrapper>
  );
};

export default TripCard;
