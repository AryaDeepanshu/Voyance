import React from "react";
import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
  height: max-content;
  width: calc(100% - 20px);
  padding: 20px 10px;
`;

const Carousel = styled.div`
  display: flex;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
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
  flex: 8;
`;

const RatingContainer = styled.div`
  flex: 2;
`;

const Info = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const PriceDetails = styled.div`
  width: 40%;
  margin-top: 12px;
`;

const HotelCardLoader = () => {
  return (
    <Container>
      <Carousel>
        <ImgContainer>
          <Skeleton
            width={"100%"}
            height={"100%"}
            style={{
              borderRadius: "15px",
            }}
          />
        </ImgContainer>
      </Carousel>

      <InformationContainer>
        <HeaderContainer>
          <Header>
            <Skeleton width={"90%"} />
          </Header>
          <RatingContainer>
            <Skeleton />
          </RatingContainer>
        </HeaderContainer>
        <Info>
          <Skeleton />
        </Info>
        <PriceDetails>
          <Skeleton />
        </PriceDetails>
      </InformationContainer>
    </Container>
  );
};

export default HotelCardLoader;
