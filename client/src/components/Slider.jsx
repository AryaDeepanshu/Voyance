import React, { useRef } from "react";
import styled from "styled-components";
import ExploreLocationCard from "./ExploreLocationCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { exploreLocationInfo } from "../data/exploreLocationInfo";
import { mobile, largeMobile, tablet } from "../utils/responsive";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0px;
`;

const Container = styled.div`
  width: 94%;
`;

const SliderWrapper = styled.div`
  gap: 15px;
  width: 100%;
  display: grid;
  overflow-x: auto;
  scrollbar-width: none;
  grid-auto-flow: column;
  scroll-behavior: smooth;
  grid-auto-columns: calc((100% / 3) - 10px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${tablet({
    gridAutoColumns: "calc((100% / 2) - 10px)",
  })}

  ${largeMobile({
    gridAutoColumns: "calc((100%) / 2 - 10px)",
  })}

${mobile({
    gridAutoColumns: "calc((100%) - 100px)",
  })}
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
`;

const Heading = styled.p`
  margin: 0px;
  font-size: 32px;
  font-weight: 600;
  font-family: "Bree Serif", serif;

  ${largeMobile({
    fontSize: "26px",
  })}

  ${mobile({
    fontSize: "20px",
  })}
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
`;

const Slider = ({ heading }) => {
  const ref = useRef();
  const { width } = useWindowDimensions();

  const handleScroll = (direction) => {
    const innerWidth = ref.current.offsetWidth;

    let val =
      width <= 480
        ? innerWidth - 85
        : width <= 660
        ? innerWidth / 2 + 5
        : width <= 768
        ? innerWidth / 2 + 5
        : innerWidth / 3 + 10;

    if (direction === "left") ref.current.scrollLeft -= val;
    if (direction === "right") ref.current.scrollLeft += val;
  };

  return (
    <Wrapper>
      <Container>
        <HeaderWrapper>
          <Heading> {heading} </Heading>
          <ButtonWrapper>
            <Button onClick={() => handleScroll("left")}>
              <KeyboardArrowLeft />
            </Button>
            <Button onClick={() => handleScroll("right")}>
              <KeyboardArrowRight />
            </Button>
          </ButtonWrapper>
        </HeaderWrapper>

        <SliderWrapper ref={ref}>
          {exploreLocationInfo.map((info, index) => (
            <ExploreLocationCard key={index} info={info} />
          ))}
        </SliderWrapper>
      </Container>
    </Wrapper>
  );
};

export default Slider;
