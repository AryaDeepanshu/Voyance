import styled from "styled-components";
import { ArrowForwardIos } from "@mui/icons-material";
import { largeMobile, desktop, mobile, tablet } from "../utils/responsive";
import { useNavigate } from "react-router-dom";

import Location_Map from "../static/Location_Map5.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { search } from "../redux/filterAndSearchSlice";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const Heading = styled.h1`
  font-family: "Bree Serif", serif;
  padding: 25px;
  ${mobile({
    fontSize: "24px",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftSection = styled.div`
  flex: 1;

  ${mobile({
    display: "none",
  })}

  ${largeMobile({
    display: "none",
  })}

  ${tablet({
    display: "none",
  })}
`;

const LeftImg = styled.img`
  padding-left: 40px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${desktop({
    padding: "15px 0px",
  })};
`;

const DestinationContainer = styled.div`
  display: flex;
  min-height: 105px;
  width: 80%;
  border-radius: 10px;
  margin-bottom: 5%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${mobile({
    width: "90%",
  })}

  ${largeMobile({
    width: "80%",
  })}

  ${tablet({
    width: "80%",
  })}

  ${desktop({
    width: "70%",
  })}
`;

const ImgContainer = styled.div`
  flex: 4;
  width: 100%;
  aspect-ratio: 1/1;
  margin-right: 10px;

  ${mobile({
    flex: "5",
  })}

  ${largeMobile({
    flex: "5",
  })}
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const InfoContainer = styled.div`
  flex: 6;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${mobile({
    flexDirection: "column",
  })}

  ${tablet({
    flexDirection: "column",
  })}
`;

const Title = styled.p`
  flex: 1.5;
  font-weight: bold;
  font-size: 20px;
  font-family: "Bree Serif", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;

  ${mobile({
    flex: "1",
    marginRight: "0px",
  })}
`;

const Description = styled.p`
  color: #151515;
  font-weight: bold;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  flex: 1;
  margin-right: 10px;
  text-align: center;

  ${mobile({
    marginRight: "0px",
  })}
`;

const NextArrowContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopularDestinations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const beginDate = dayjs();
  const endDate = dayjs().add(1, "day");

  const handleSearch = (location) => {
    if (location === "") return;
    dispatch(
      search({
        location: location,
        beginDate: beginDate.format("MM/DD/YYYY"),
        endDate: endDate.format("MM/DD/YYYY"),
        stay: endDate.diff(beginDate, "day"),
        guest: 1,
      })
    );

    navigate(`/search?location=${location}`);
  };
  return (
    <Container>
      <Heading> Popular Destinations </Heading>

      <Wrapper>
        <LeftSection>
          <LeftImg src={Location_Map} />
        </LeftSection>
        <RightSection>
          <DestinationContainer>
            <ImgContainer>
              <Img src="" />
            </ImgContainer>
            <InfoContainer>
              <Title>Goa, India</Title>
              <Description>20+ Spots 2D & 3N</Description>
            </InfoContainer>
            <NextArrowContainer>
              <ArrowForwardIos
                style={{ transform: "scale(0.7)", cursor: "pointer" }}
                onClick={() => handleSearch("goa")}
              />
            </NextArrowContainer>
          </DestinationContainer>
          <DestinationContainer>
            <ImgContainer>
              <Img src="https://images.unsplash.com/photo-1586255028095-d93edb74e412?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" />
            </ImgContainer>
            <InfoContainer>
              <Title>Uttarakhand, India</Title>
              <Description>100+ Spots 4D & 5N</Description>
            </InfoContainer>
            <NextArrowContainer>
              <ArrowForwardIos
                style={{ transform: "scale(0.7)", cursor: "pointer" }}
                onClick={() => handleSearch("uttarakhand")}
              />
            </NextArrowContainer>
          </DestinationContainer>
          <DestinationContainer>
            <ImgContainer>
              <Img src="https://images.unsplash.com/photo-1587293005014-ecd16293d120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
            </ImgContainer>
            <InfoContainer>
              <Title>Himachal Pradesh, India</Title>
              <Description>80+ Spots 6D & 7N</Description>
            </InfoContainer>
            <NextArrowContainer>
              <ArrowForwardIos
                style={{ transform: "scale(0.7)", cursor: "pointer" }}
                onClick={() => handleSearch("himachal pradesh")}
              />
            </NextArrowContainer>
          </DestinationContainer>
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default PopularDestinations;
