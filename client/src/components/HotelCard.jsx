import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { desktop, largeMobile, mobile, tablet } from "../responsive";

import {
  Star,
  Favorite,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

const Button = styled.button`
  position: absolute;
  top: 45%;
  right: ${(props) => (props.direction === "forward" ? "8px" : "")};
  left: ${(props) => (props.direction === "backward" ? "8px" : "")};
  padding: 8px;
  border-radius: 50%;
  z-index: 1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: 0;
  cursor: pointer;
`;

const Container = styled.div`
  height: max-content;
  width: 90%;
  padding: 20px 10px;

  &:hover ${Button} {
    transition: ease-in 0.5s;
    opacity: 1;
  }
`;

const Carousel = styled.div`
  display: flex;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const Like = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: white;
  background: transparent;
  border: none;
`;

const SliderContainer = styled.div`
  height: max-content;
  width: max-content;
  position: absolute;
  bottom: 15px;
  left: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

const SlideNumber = styled.div`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: lightgray;
  &:nth-child(${(props) => props.index + 1}) {
    background-color: red;
    height: 8px;
    width: 8px;
  }
`;

const InformationContainer = styled.div`
  padding: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Header = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
`;

const Info = styled.div`
  font-size: 14px;
  color: gray;
  font-family: "Montserrat", sans-serif;
  margin-top: 5px;
`;

const Date = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
  font-family: "Montserrat", sans-serif;
`;

const PriceDetails = styled.div`
  margin-top: 12px;
`;

const Price = styled.span`
  font-size: 15px;
  margin-right: 5px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
`;

const Duration = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
`;

const HotelCard = ({ hotelInfo }) => {
  // Logic for string Truncation:
  const trimTitle = (title) => {
    if (title.length > 35) {
      title = title.substring(0, 35) + "...";
    }
    return title;
  };

  // Logic for Changing color of wishlist Icon
  const [wishlist, setWishlist] = useState("white");
  const toogleWishlist = () => {
    wishlist === "white" ? setWishlist("red") : setWishlist("white");
  };

  const [index, setIndex] = useState(0);

  const handleMoveButton = (direction) => {
    const length = hotelInfo.images.length;
    if (direction === "backward") {
      if (index === 0) setIndex(length - 1);
      else setIndex(index - 1);
    }

    if (direction === "forward") {
      if (index === length - 1) setIndex(0);
      else setIndex(index + 1);
    }
  };

  return (
    <Container>
      {/* Hotel Image Carousel */}
      <Carousel>
        <ImgContainer>
          <Img alt="hotel" src={hotelInfo.images[index]} />
        </ImgContainer>
        <Like onClick={toogleWishlist}>
          <Favorite style={{ color: `${wishlist}`, fontSize: "28px" }} />
        </Like>
        <Button
          direction="backward"
          onClick={() => handleMoveButton("backward")}>
          <ArrowBackIos style={{ fontSize: "15px" }} />
        </Button>
        <Button direction="forward" onClick={() => handleMoveButton("forward")}>
          <ArrowForwardIos style={{ fontSize: "15px" }} />
        </Button>
        <SliderContainer>
          {hotelInfo.images.map((_, i) => (
            <SlideNumber index={index} key={i} />
          ))}
        </SliderContainer>
      </Carousel>

      {/* Hotel Information */}
      <Link
        to={`/hotel-information/${hotelInfo._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>
        <InformationContainer>
          <HeaderContainer>
            <Header>{hotelInfo.location}</Header>
            <RatingContainer>
              <Star
                style={{
                  fontSize: "18px",
                  marginRight: "5px",
                  fontFamily: "Montserrat",
                }}
              />
              <Rating>
                {hotelInfo.starNumber === 0
                  ? 0
                  : hotelInfo.totalStars / hotelInfo.starNumber}
              </Rating>
            </RatingContainer>
          </HeaderContainer>
          <Info> {trimTitle(hotelInfo.name)} </Info>
          <Date> date here </Date>
          <PriceDetails>
            <Price>${hotelInfo.cost}</Price>
            <Duration>night</Duration>
          </PriceDetails>
        </InformationContainer>
      </Link>
    </Container>
  );
};

export default HotelCard;
