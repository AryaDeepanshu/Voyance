import {
  AddCircleOutline,
  ArrowDownward,
  Close,
  CurrencyRupee,
  Grade,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { tablet, desktop } from "../responsive";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: max-content;
  position: sticky;
  top: 10px;
`;

const Wrapper = styled.div`
  margin: 5%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  max-width: 350px;
  background-color: white;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5%;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: max-content;
  padding-top: 5px;
`;

const Price = styled.p`
  font-size: ${(props) =>
    props.type === "cost" || props.type === "final" ? "16px" : "24px"};
  font-weight: ${(props) => (props.type === "cost" ? "" : "bold")};
  font-family: "Montserrat", sans-serif;
  color: ${(props) =>
    props.discount === "yes" || props.type === "cost" ? "#7f8487" : ""};
  text-decoration: ${(props) =>
    props.discount === "yes" ? "line-through" : ""};
`;

const Duration = styled.p`
  padding: 5px 0px 2px 5px;
  font-family: "Montserrat", sans-serif;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: max-content;
  padding-top: 5px;
  padding-bottom: 2px;
`;

const Rating = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const Review = styled.p`
  padding-bottom: 2px;
  padding-top: 5px;
  padding-left: 3px;
  font-size: 14px;
  width: max-content;
  font-weight: bold;
  color: gray;
  text-decoration: underline;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
`;

const TripDetails = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 3%;
  /* position: relative; */
  border-right: ${(props) => (props.type === "left" ? "1px solid black" : "")};
  border-top: ${(props) => (props.type === "guest" ? "1px solid black" : "")};
  width: ${(props) => (props.width === "half" ? "43%" : "95%")};
  flex-direction: ${(props) => (props.type === "guest" ? "row" : "column")};
  align-items: ${(props) => (props.type === "guest" ? "center" : "")};
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  padding-left: 2px;

  ${tablet({
    fontSize: "10px",
  })}
`;

const Input = styled.input`
  color: #7f8487;
  font-size: 16px;
  outline: none;
  border: none;
  font-family: "Montserrat", sans-serif;

  ::placeholder {
    color: gray;
    font-size: 12px;
    font-family: "Montserrat", sans-serif;
  }

  ${tablet({
    fontSize: "10px",
  })}
`;

const GuestContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GuestValueContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px;
  margin: 10px 0px;
  border-radius: 10px;
  border: none;
  background-color: #4ee2ec;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;

  &:hover {
    opacity: 0.5;
    transition: all 0.2s;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
`;

const Data = styled.p`
  color: ${(props) => (props.type === "final" ? " " : "#7f8487")};
  font-weight: ${(props) => (props.type === "final" ? "bold" : "")};
  font-size: ${(props) => (props.type === "final" ? "16px" : "14px")};
  text-decoration: underline;
  font-family: "Montserrat", sans-serif;

  ${desktop({})}
`;

const Hr = styled.hr`
  color: lightgray;
  margin: 10px 0px;
`;

const CloseButton = styled.div`
  width: max-content;
  height: max-content;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;



// just handle below 661 px rest all set.
const ReservationCard = ({ data, setModal, checkoutHandler }) => {
  // Width of window:
  const { width } = useWindowDimensions();
  const [guest, setGuest] = useState(1);

  /* get the search data from redux toolkit */
  const search = useSelector((state) => state.search);

  return (
    <Container>
      <Wrapper>
        {width <= 768 ? (
          <CloseButton onClick={() => setModal(0)}>
            <Close style={{ transform: "scale(1.4)", color: "gray" }} />
          </CloseButton>
        ) : (
          <></>
        )}
        <TopContainer>
          <PriceContainer>
            <CurrencyRupee
              style={{
                fontSize: "23px",
                padding: "2px",
                color: "#7f8487",
              }}
            />
            <Price discount="yes">2800</Price>
          </PriceContainer>
          <PriceContainer>
            <CurrencyRupee style={{ fontSize: "23px", padding: "2px" }} />
            <Price>{data.cost}</Price>
            <Duration>night</Duration>
          </PriceContainer>
          <RatingContainer>
            <Grade style={{ fontSize: "20px" }} />{" "}
            <Rating>
              {data.starNumber === 0 ? 0 : data.totalStars / data.starNumber}
            </Rating>
          </RatingContainer>
          <Review> --- reviews</Review>
        </TopContainer>

        <TripDetails>
          <InputContainer width="half" type="left">
            <Label>CHECK-IN</Label>
            <Input placeholder={search.startDate} />
          </InputContainer>
          <InputContainer width="half" type="right">
            <Label>CHECK-OUT</Label>
            <Input placeholder={search.endDate} />
          </InputContainer>
          <InputContainer type="guest">
            <GuestContainer>
              <Label>GUESTS</Label>
              <Input placeholder={guest} />
            </GuestContainer>
            <GuestValueContainer>
              <RemoveCircleOutline
                style={{
                  transform: "scale(1.2)",
                  color: "#4ee2ec",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setGuest(guest == 1 ? guest : guest - 1);
                }}
              />
              <AddCircleOutline
                style={{
                  transform: "scale(1.2)",
                  color: "#4ee2ec",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setGuest(guest == 10 ? guest : guest + 1);
                }}
              />
            </GuestValueContainer>
          </InputContainer>
        </TripDetails>

        <Button onClick={()=>checkoutHandler(data.cost)}>Reserve</Button>

        <DataContainer>
          <DataWrapper>
            <Data>2800 x 2 nights</Data>
            <PriceContainer>
              <CurrencyRupee
                style={{ fontSize: "18px", padding: "2px", color: "#7f8487" }}
              />
              <Price type="cost">2240</Price>
            </PriceContainer>
          </DataWrapper>
          <DataWrapper>
            <Data>Discount</Data>
            <PriceContainer>
              <CurrencyRupee
                style={{ fontSize: "18px", padding: "2px", color: "#7f8487" }}
              />
              <Price type="cost">2240</Price>
            </PriceContainer>
          </DataWrapper>
          <DataWrapper>
            <Data>Service fee</Data>
            <PriceContainer>
              <CurrencyRupee
                style={{ fontSize: "18px", padding: "2px", color: "#7f8487" }}
              />
              <Price type="cost">2240</Price>
            </PriceContainer>
          </DataWrapper>
        </DataContainer>
        <Hr />
        <DataWrapper>
          <Data type="final">Total before taxes</Data>
          <PriceContainer>
            <CurrencyRupee style={{ fontSize: "18px", padding: "2px" }} />
            <Price type="final">{data.cost}</Price>
          </PriceContainer>
        </DataWrapper>
      </Wrapper>
    </Container>
  );
};

export default ReservationCard;
