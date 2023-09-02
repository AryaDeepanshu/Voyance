import { Grade } from "@mui/icons-material";
import styled from "styled-components";
import { desktop, largeMobile, mobile } from "../utils/responsive";

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
  font-size: 20px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
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
      <Header>{data?.name}</Header>
      <DataWrapper>
        <RatingContainer>
          <Grade style={{ fontSize: "24px", color: "#E6B325" }} />
          <Rating>{data?.rating}</Rating>
        </RatingContainer>
        <Data>{data?.location}</Data>
      </DataWrapper>
    </Container>
  );
};

export default HotelHeading;
