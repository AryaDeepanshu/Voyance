import HotelCard from "./HotelCard";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const HotelList = ({ hotel_data }) => {
  /* Fetching user wishlist using Redux: */
  const { wishlist } = useSelector((store) => store.wishlist);

  const colorHandler = (_id) => {
    const index = wishlist.indexOf(_id);
    return index === -1 ? "white" : "red";
  };

  return (
    <Container>
      {hotel_data.map((hotelInfo, index) => (
        <HotelCard
          hotelInfo={hotelInfo}
          key={index}
          color={colorHandler(hotelInfo._id)}
        />
      ))}
    </Container>
  );
};

export default HotelList;
