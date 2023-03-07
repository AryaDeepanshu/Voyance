import styled from "styled-components";
import AboutPlace from "./AboutPlace";
import HotelAmenities from "./HotelAmenities";
import HotelFeatures from "./HotelFeatures";
import HotelLocation from "./HotelLocation";

const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const Hr = styled.div`
  border-top: 1px solid lightgray;
  width: 90%;
  margin: 20px 0px;
`;

const HotelDetails = ({ data }) => {
  return (
    <Container>
      <HotelFeatures />
      <Hr />
      <AboutPlace data={data} />
      <Hr />
      <HotelAmenities data={data} />
      <Hr />
      <HotelLocation data={data} />
    </Container>
  );
};

export default HotelDetails;
