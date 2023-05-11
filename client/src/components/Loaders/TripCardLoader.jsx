import React from "react";
import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { largeMobile, mobile, tablet, desktop } from "../../responsive";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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

const TripCardLoader = () => {
  const { width } = useWindowDimensions();
  return (
    <Wrapper>
      {Array(4)
        .fill(null)
        .map((index) => (
          <TripCardWrapper key={index}>
            {width > 660 && (
              <TripCardImg>
                <Skeleton height={"100%"} width={"100%"} />
              </TripCardImg>
            )}
            <TripCardContainer>
              <HotelNameWrapper>
                <HotelName>
                  <Skeleton width={"70%"} />
                </HotelName>
                <HotelDetailWrapper>
                  <HotelAddress>
                    <Skeleton width={"250px"} height={"25px"} />
                  </HotelAddress>
                  <HotelRating>
                    <Skeleton width={"50px"} height={"25px"} />
                  </HotelRating>
                </HotelDetailWrapper>
              </HotelNameWrapper>

              <BottomWrapper>
                <OrderDetailContainer>
                  <Detail>
                    <Skeleton width={"150px"} height={"25px"} />
                  </Detail>
                  <Detail>
                    <Skeleton width={"150px"} height={"25px"} />
                  </Detail>
                </OrderDetailContainer>
                <DetailContainer>
                  <Detail>
                    <Skeleton width={"150px"} height={"25px"} />
                  </Detail>
                  <Detail>
                    <Skeleton width={"100px"} height={"25px"} />
                  </Detail>
                </DetailContainer>
              </BottomWrapper>
            </TripCardContainer>
          </TripCardWrapper>
        ))}
    </Wrapper>
  );
};

export default TripCardLoader;
