import React from "react";
import styled from "styled-components";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { desktop, largeMobile, mobile, tablet } from "../../utils/responsive";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Wrapper = styled.div`
  height: max-content;
  width: calc(100vw - 10%);
`;

const BottomContainer = styled.div`
  gap: 25px;
  display: flex;
  position: relative;
  margin-bottom: 100px;
`;

// HotelHeading Component:
const HotelHeadingContainer = styled.div`
  width: 100%;
  height: max-content;
`;

const Header = styled.p`
  padding-top: 10px;
  width: 70%;

  ${largeMobile({
    width: "80%",
  })}

  ${mobile({
    width: "90%",
  })}
`;

const DataWrapper = styled.div`
  padding-top: 10px;
  width: 50%;

  ${mobile({
    width: "70%",
  })};
`;

// HotelImageSlider Component:
const HotelImageSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3% 0% 1% 0%;
  width: 100%;
`;

const HotelImageSliderWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const LeftDiv = styled.div`
  flex: 1;
  width: 100%;
  aspect-ratio: 4/3;
`;

const RightDiv = styled.div`
  flex: 1;
  width: 100%;
  aspect-ratio: 4/3;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ImgContainer = styled.div`
  margin-bottom: 10px;
  margin-left: ${(props) => (props.type === "thumbnail" ? "0px" : "2%")};
  width: ${(props) => (props.type === "thumbnail" ? "100%" : "48%")};
  aspect-ratio: 4/3;
`;

// HotelDetails Component
const HotelDetailsContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

// HotelHostDetail Component
const HotelHostDetailWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${desktop({
    width: "90%",
  })}
`;

const LeftContainer = styled.div``;

const Host = styled.div`
  width: 50%;
  margin-bottom: 5px;

  ${largeMobile({
    width: "250px",
  })}

  ${mobile({
    width: "150%",
  })}
`;

const Detail = styled.div`
  width: 300px;
  margin-bottom: 5px;

  ${tablet({
    width: "300px",
  })}
`;

const RightContainer = styled.div``;

// HotelFeatures Component:
const HotelFeaturesContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// AboutPlace Component:
const AboutPlaceContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// HotelAmenities && HotelMeal Component:
const Heading = styled.p`
  width: 50%;
  margin-top: 20px;

  ${largeMobile({
    width: "60%",
  })}

  ${mobile({
    width: "70%",
  })}
`;

const HotelAmenitiesWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 10px;
  margin-bottom: 10px;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

  ${desktop({
    width: "90%",
  })}
`;

const HotelAmenitiesContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 10px;
`;

// HotelLocation Component:
const HotelLocationContainer = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

// Reservation Component:
const ReservationContainer = styled.div`
  border: 2px solid black;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: max-content;
  position: sticky;
  top: 10px;
  right: 0px;
  max-width: 350px;
  border-radius: 5px;
`;

const ReservationWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
`;

const TripDetails = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
`;

const Button = styled.div``;

const HotelInformationLoader = () => {
  const { width } = useWindowDimensions();
  return (
    <Wrapper>
      {/* HotelHeading Component Skeleton */}
      <HotelHeadingContainer>
        <Header>
          <Skeleton height={"30px"} />
        </Header>
        <DataWrapper>
          <Skeleton />
        </DataWrapper>
      </HotelHeadingContainer>

      {/* HotelImageSlider Component Skeleton */}
      <HotelImageSliderContainer>
        <HotelImageSliderWrapper>
          <LeftDiv>
            <ImgContainer type="thumbnail">
              <Skeleton width={"100%"} height={"100%"} />
            </ImgContainer>
          </LeftDiv>
          {width > 660 && (
            <RightDiv>
              {Array.apply(null, Array(4)).map((_, index) => (
                <ImgContainer key={index}>
                  <Skeleton width={"100%"} height={"100%"} />
                </ImgContainer>
              ))}
            </RightDiv>
          )}
        </HotelImageSliderWrapper>
      </HotelImageSliderContainer>

      <BottomContainer>
        {/* HotelDetails Component Skeleton */}
        <HotelDetailsContainer>
          {/*HotelHostDetail Component Skeleton  */}
          <HotelHostDetailWrapper>
            <LeftContainer>
              <Host>
                <Skeleton height={"30px"} />
              </Host>
              {Array.apply(null, Array(3)).map((_, index) => (
                <Detail key={index}>
                  <Skeleton />
                </Detail>
              ))}
            </LeftContainer>
            <RightContainer>
              <Skeleton circle={true} height={"80px"} width={"80px"} />
            </RightContainer>
          </HotelHostDetailWrapper>

          {/* HotelFeatures Component Skeleton */}
          <HotelFeaturesContainer>
            <Skeleton height={"200px"} />
          </HotelFeaturesContainer>

          {/* AboutPlace Component Skeleton */}
          <Heading>
            <Skeleton height={"30px"} />
          </Heading>
          <AboutPlaceContainer>
            <Skeleton height={"250px"} />
          </AboutPlaceContainer>

          {/* HotelAmenities Component Skeleton */}
          <Heading>
            <Skeleton height={"30px"} />
          </Heading>
          <HotelAmenitiesWrapper>
            {Array.apply(null, Array(6)).map((_, index) => (
              <HotelAmenitiesContainer key={index}>
                <Skeleton height={"100px"} />
              </HotelAmenitiesContainer>
            ))}
          </HotelAmenitiesWrapper>

          {/* HotelMeal Component Skeleton */}
          <Heading>
            <Skeleton height={"30px"} />
          </Heading>
          <HotelAmenitiesWrapper>
            {Array.apply(null, Array(2)).map((_, index) => (
              <HotelAmenitiesContainer key={index}>
                <Skeleton height={"100px"} />
              </HotelAmenitiesContainer>
            ))}
          </HotelAmenitiesWrapper>

          {/* <HotelLocation Component Skeleton: */}
          <Heading>
            <Skeleton height={"30px"} />
          </Heading>
          <HotelLocationContainer>
            <Skeleton style={{ aspectRatio: "2.5" }} />
          </HotelLocationContainer>
        </HotelDetailsContainer>

        {width > 768 && (
          // Reservation Component Skeleton:
          <ReservationContainer>
            <ReservationWrapper>
              {/* Reservation Component: */}
              <TopContainer>
                <Skeleton />
              </TopContainer>

              <TripDetails>
                <Skeleton style={{ aspectRatio: "1" }} />
              </TripDetails>

              <TopContainer>
                <Skeleton />
              </TopContainer>

              <Button>
                <Skeleton height={"40px"} />
              </Button>
            </ReservationWrapper>
          </ReservationContainer>
        )}
      </BottomContainer>
    </Wrapper>
  );
};

export default HotelInformationLoader;
