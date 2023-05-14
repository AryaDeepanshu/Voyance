import styled from "styled-components";
import { desktop, largeMobile, mobile } from "../utils/responsive";
import HotelHostDetail from "./HotelHostDetail";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: max-content;

  ${desktop({
    width: "90%",
  })}
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
  font-family: "Bree Serif", serif;
  ${mobile({
    fontSize: "24px",
  })}
`;

const Info = styled.p`
  color: #2a2a2a;
  line-height: 22px;
  word-spacing: 1px;
  font-family: "Roboto", sans-serif;

  ${largeMobile({
    fontSize: "15px",
  })}

  ${mobile({
    fontSize: "14px",
  })}
`;

const AboutPlace = ({ data }) => {
  return (
    <Container>
      <Heading>About the space:</Heading>
      <Info>{data.about}</Info>
    </Container>
  );
};

export default AboutPlace;
