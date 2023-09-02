import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Star,
  Favorite,
  ArrowBackIos,
  ArrowForwardIos,
  CurrencyRupee,
} from "@mui/icons-material";
import { wishlisthandler } from "../redux/wishlistSlice";

import Modal from "./Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AddToWishlist, RemoveFromWishlist } from "../utils/notification";
import { largeMobile, mobile, tablet } from "../utils/responsive";

const Wrapper = styled.div``;

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

  ${mobile({
    opacity: "1",
  })}

  ${largeMobile({
    opacity: "1",
  })}

  ${tablet({
    opacity: "1",
  })}
`;

const Container = styled.div`
  height: max-content;
  width: calc(100% - 20px);
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

const PriceDetails = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 15px;
  margin-right: 5px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
`;

const Duration = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
`;

const AccomodationCard = React.forwardRef(({ hotelInfo }, ref) => {
  /* Get the signed in user from the redux store: */
  const user = useSelector((store) => store.user.currentUser);

  /* Logic for string Truncation: */
  const trimTitle = (title) => {
    if (title.length > 35) {
      title = title.substring(0, 35) + "...";
    }
    return title;
  };

  /* Logic for Changing color of wishlist Icon: */
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.wishlist);

  /* Carousel util: */
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

  /* State for handling the Login and Register Modal */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  /* Handling wishlist functionality: */
  const handleWishlist = (info) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    dispatch(wishlisthandler(info));
    const accomodation = wishlist.filter((acc) => acc._id === info._id);
    accomodation.length === 0 ? AddToWishlist() : RemoveFromWishlist();
  };

  const AccomodationInfo = (
    <>
      {showLoginModal && (
        <Modal>
          <SignIn
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal>
          <SignUp
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      <Container>
        {/* Hotel Image Carousel */}
        <Carousel>
          {/* Carousel: */}
          <ImgContainer>
            <Img alt="hotel" src={hotelInfo.images[index]} />
          </ImgContainer>

          {/* Wishlist Icon: */}
          <Like onClick={() => handleWishlist(hotelInfo)}>
            <Favorite
              style={{
                color:
                  wishlist?.filter((wish) => wish?._id === hotelInfo?._id)
                    .length === 0
                    ? "white"
                    : "red",
              }}
            />
          </Like>

          {/* Backward Button: */}
          <Button
            direction="backward"
            onClick={() => handleMoveButton("backward")}>
            <ArrowBackIos style={{ fontSize: "15px" }} />
          </Button>

          {/* Forward Button */}
          <Button
            direction="forward"
            onClick={() => handleMoveButton("forward")}>
            <ArrowForwardIos style={{ fontSize: "15px" }} />
          </Button>

          {/* Index Dot: */}
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
                <Rating>{hotelInfo.rating}</Rating>
              </RatingContainer>
            </HeaderContainer>
            <Info> {trimTitle(hotelInfo.name)} </Info>
            <PriceDetails>
              <Price>
                <CurrencyRupee style={{ transform: "scale(0.7)" }} />
                {hotelInfo.cost}
              </Price>
              <Duration>night</Duration>
            </PriceDetails>
          </InformationContainer>
        </Link>
      </Container>
    </>
  );

  return ref ? (
    <Wrapper ref={ref}>{AccomodationInfo}</Wrapper>
  ) : (
    <Wrapper>{AccomodationInfo}</Wrapper>
  );
});

export default AccomodationCard;
