import styled from "styled-components";
import { desktop } from "../utils/responsive";
import AboutPlace from "./AboutPlace";
import HotelAmenities from "./HotelAmenities";
import HotelFeatures from "./HotelFeatures";
import HotelHostDetail from "./HotelHostDetail";
import HotelLocation from "./HotelLocation";
import HotelMeal from "./HotelMeal";

const Container = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Hr = styled.div`
  border-top: 1px solid lightgray;
  width: 100%;
  margin: 20px 0px;

  ${desktop({
    width: "90%",
  })}
`;

const HotelDetails = ({ data }) => {
  return (
    <Container>
      <HotelHostDetail data={data} />
      <Hr />
      <HotelFeatures />
      <Hr />
      <AboutPlace data={data} />
      <Hr />
      <HotelAmenities data={data} />
      <Hr />
      <HotelMeal data={data} />
      <Hr />
      <HotelLocation data={data} />
    </Container>
  );
};

export default HotelDetails;
