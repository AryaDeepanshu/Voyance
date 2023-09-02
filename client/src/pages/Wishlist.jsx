import styled from "styled-components";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import HotelCard from "../components/HotelCard";
import { largeMobile, mobile } from "../utils/responsive";
import { useEffect } from "react";

const ExternalWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-top: 80px;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: calc(100vw - 10%);
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Heading = styled.div`
  font-size: 48px;
  margin-left: 10px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "32px",
    margin: "1% 0% 0% 6%",
  })}

  ${largeMobile({
    fontSize: "36px",
    margin: "1% 0% 0% 5%",
  })}
`;

const Wishlist = () => {
  /* Scrolling to top of page whenever page reloads: */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Wishlist Info using Redux: */
  const { wishlist } = useSelector((store) => store.wishlist);

  return (
    <ExternalWrapper>
      <Container>
        <Heading>Your Wishlist:</Heading>
        {wishlist.length === 0 ? (
          <Empty wishlist={true} />
        ) : (
          <Wrapper>
            {wishlist.map((accomodation) => (
              <HotelCard
                key={accomodation._id}
                hotelInfo={accomodation}
                color="red"
              />
            ))}
          </Wrapper>
        )}
      </Container>
    </ExternalWrapper>
  );
};

export default Wishlist;
