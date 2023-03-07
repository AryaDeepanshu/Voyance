import styled from "styled-components";
import { HotelListData } from "../data/HotelListData";
import HotelCard from "./HotelCard";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 2% 3% 0% 3%;
`;

const HotelList = ({ hotel_data }) => {
  return (
    <Container>
      {hotel_data.map((hotel, index) => (
        <HotelCard hotelInfo={hotel} key={index} />
      ))}
    </Container>
  );
};

export default HotelList;
