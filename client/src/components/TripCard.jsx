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
import { Link } from "react-router-dom";

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
`;

const HotelNameWrapper = styled.div`
  cursor: pointer;
`;

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

const TripCard = ({ tripData }) => {
  const { width } = useWindowDimensions();

  return (
    <Wrapper>
      {tripData.map((trip) => (
        <TripCardWrapper key={trip?._id}>
          {width > 660 && (
            <TripCardImg>
              <Img src={trip?.hotel?.images[0]} />
            </TripCardImg>
          )}
          <TripCardContainer>
            <Link
              to={`/hotel-information/${trip?.hotel?._id}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <HotelNameWrapper>
                <HotelName>{trip?.hotel?.name}</HotelName>
                <HotelDetailWrapper>
                  <HotelAddress>{trip?.hotel?.location}</HotelAddress>
                  <HotelRating>
                    <Star style={{ transform: "scale(0.7)" }} />
                    {trip?.hotel.starNumber === 0
                      ? 0
                      : (
                          trip?.hotel?.starNumber / trip?.hotel?.totalStars
                        ).toFixed(1)}
                  </HotelRating>
                </HotelDetailWrapper>
              </HotelNameWrapper>
            </Link>

            <BottomWrapper>
              <OrderDetailContainer>
                <Detail>
                  <ReceiptOutlined
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  {trip?.razorpay_order_id}
                </Detail>
                <Detail>
                  <Grid3x3
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  {trip?.razorpay_payment_id}
                </Detail>
              </OrderDetailContainer>
              <DetailContainer>
                <Detail>
                  <CalendarMonthOutlined
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  {`${trip?.beginDate} - ${trip?.endDate}`}
                </Detail>
                <Detail>
                  <CurrencyRupee
                    style={{ transform: "scale(0.9)", paddingRight: "5px" }}
                  />
                  {trip?.totalCost}
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
