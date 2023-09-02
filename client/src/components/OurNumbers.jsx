import { useState } from "react";
import CountUp from "react-countup";
import styled from "styled-components";
import ScrollTrigger from "react-scroll-trigger";
import { largeMobile, mobile } from "../utils/responsive";
import {
  AirplanemodeActive,
  Deck,
  ModeOfTravel,
  Reviews,
} from "@mui/icons-material";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 25px;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const OurNumberWrapper = styled.div`
  width: 94%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  ${largeMobile({
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  })}

  ${mobile({
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  })}
`;

const OurNumberContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 30px 0px;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Number = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: "Noto Serif", serif;

  ${mobile({
    fontSize: "24px",
  })}

  ${largeMobile({
    fontSize: "24px",
  })}
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
`;

const Text = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 0px 10px;
  font-family: "Noto Serif", serif;

  ${largeMobile({
    fontSize: "16px",
  })}

  ${mobile({
    fontSize: "18px",
  })}
`;

const OurNumbers = () => {
  const [countOn, setCountOn] = useState(false);
  return (
    <ScrollTrigger
      onEnter={() => setCountOn(true)}
      onExit={() => setCountOn(false)}>
      <Wrapper>
        <OurNumberWrapper>
          <OurNumberContainer>
            <Number>
              <AirplanemodeActive />
              {countOn && <CountUp start={0} end={50} duration={3} delay={0} />}
              +
            </Number>
            <TextWrapper>
              <Text>Destinations</Text>
            </TextWrapper>
          </OurNumberContainer>
          <OurNumberContainer>
            <Number>
              <ModeOfTravel />
              {countOn && (
                <CountUp start={0} end={400} duration={3} delay={0} />
              )}
              +
            </Number>
            <TextWrapper>
              <Text> Customers </Text>
            </TextWrapper>
          </OurNumberContainer>

          <OurNumberContainer>
            <Number>
              <Deck />
              {countOn && (
                <CountUp start={0} end={200} duration={3} delay={0} />
              )}
              +
            </Number>
            <TextWrapper>
              <Text>Accomodations</Text>
            </TextWrapper>
          </OurNumberContainer>
          <OurNumberContainer>
            <Number>
              <Reviews />
              {countOn && <CountUp start={0} end={4} duration={3} delay={0} />}+
            </Number>
            <TextWrapper>
              <Text>Avg. Rating</Text>
            </TextWrapper>
          </OurNumberContainer>
        </OurNumberWrapper>
      </Wrapper>
    </ScrollTrigger>
  );
};

export default OurNumbers;
