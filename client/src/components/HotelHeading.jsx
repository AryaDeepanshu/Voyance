import { Star } from "@mui/icons-material";
import styled from "styled-components";
import { desktop, largeMobile, mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: max-content;
`;

const Header = styled.p`
  padding-top: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: bold;

  ${desktop({
    fontSize: "40px",
  })}

  ${largeMobile({
    fontSize: "28px",
  })}

  ${mobile({
    fontSize: "24px",
  })}
`;

const DataWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  align-items: center;
  gap: 10px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
`;

const Data = styled.p`
  font-family: "Montserrat", sans-serif;
  ${mobile({
    fontSize: "13px",
  })}
`;

const HotelHeading = ({ data }) => {
  return (
    <Container>
      <Header>{data.name}</Header>
      <DataWrapper>
        <RatingContainer>
          <Star style={{ transform: "scale(0.8)" }} />
          <Rating>
            {data.starNumber === 0 ? 0 : data.totalStars / data.starNumber}
          </Rating>
        </RatingContainer>
        <Data>--- reviews</Data>
        <Data>{data.location}</Data>
      </DataWrapper>
    </Container>
  );
};

export default HotelHeading;
