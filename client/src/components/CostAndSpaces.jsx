import React, { useState } from "react";
import styled from "@emotion/styled";
import { Add, Remove } from "@mui/icons-material";

const Label = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 5px;
  font-family: "Roboto", sans-serif;
`;

const NumericInput = styled.div`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 90px;
  outline: none;
  border: none;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid lightgray;
`;

const RangeContainer = styled.div`
  gap: 10px;
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: center;
`;

const CountOperator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;
`;

const Count = styled.p`
  font-size: 18px;
  font-family: "Roboto", sans-serif;
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "Josefin Sans", sans-serif;
`;

const CostAndSpaces = (props) => {
  const {
    price,
    setPrice,
    guest,
    setGuest,
    bedrooms,
    setBedrooms,
    beds,
    setBeds,
    bathrooms,
    setBathrooms,
    priceError,
    setPriceError,
  } = props;

  const increaseCounter = (state, setState) => {
    setState(state + 1);
  };

  const decreaseCounter = (state, setState) => {
    if (state != 1) setState(state - 1);
  };

  return (
    <div>
      {/* Price: */}
      {priceError && (
        <ErrorMessageWrapper>
          <ErrorMessage>*provide valid price</ErrorMessage>
        </ErrorMessageWrapper>
      )}
      <NumericInput>
        <Label>Price per night:</Label>
        <Input
          required
          type="number"
          value={price}
          onChange={(event) => {
            setPriceError(false);
            setPrice(event.target.value);
          }}
        />
      </NumericInput>

      {/* Guest */}
      <NumericInput>
        <Label>maximum guest permitted:</Label>
        <RangeContainer>
          <CountOperator>
            <Add
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => increaseCounter(guest, setGuest)}
            />
          </CountOperator>
          <Count>{guest}</Count>
          <CountOperator>
            <Remove
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => decreaseCounter(guest, setGuest)}
            />
          </CountOperator>
        </RangeContainer>
      </NumericInput>

      {/* Bedroom */}
      <NumericInput>
        <Label>number of bedrooms:</Label>
        <RangeContainer>
          <CountOperator>
            <Add
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => increaseCounter(bedrooms, setBedrooms)}
            />
          </CountOperator>
          <Count>{bedrooms}</Count>
          <CountOperator>
            <Remove
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => decreaseCounter(bedrooms, setBedrooms)}
            />
          </CountOperator>
        </RangeContainer>
      </NumericInput>

      {/* Bed */}
      <NumericInput>
        <Label>number of beds:</Label>
        <RangeContainer>
          <CountOperator>
            <Add
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => increaseCounter(beds, setBeds)}
            />
          </CountOperator>
          <Count>{beds}</Count>
          <CountOperator>
            <Remove
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => decreaseCounter(beds, setBeds)}
            />
          </CountOperator>
        </RangeContainer>
      </NumericInput>

      {/* Bathroom */}
      <NumericInput>
        <Label>number of bathrooms:</Label>
        <RangeContainer>
          <CountOperator>
            <Add
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => increaseCounter(bathrooms, setBathrooms)}
            />
          </CountOperator>
          <Count>{bathrooms}</Count>
          <CountOperator>
            <Remove
              style={{
                color: "gray",
                transform: "scale(0.8)",
                cursor: "pointer",
              }}
              onClick={() => decreaseCounter(bathrooms, setBathrooms)}
            />
          </CountOperator>
        </RangeContainer>
      </NumericInput>
    </div>
  );
};

export default CostAndSpaces;

//   const v = [
//     { label: "Price per night", val: "price" },
//     { label: "Maximum guest permitted", val: "guest" },
//     { label: "Number of beds", val: "beds" },
//     { label: "Number of bedrooms", val: "bedrooms" },
//     { label: "Number of bathrooms", val: "bathrooms" },
//   ];

{
  /* {v.map((requirement) => (
        <NumericInput>
          <Label>{requirement.label}</Label>
          <RangeContainer>
            <CountOperator>
              <Add style={{ color: "gray", transform: "scale(0.8)", cursor:"pointer" }} />
            </CountOperator>
            <Count>{requirement.val}</Count>
            <CountOperator>
              <Remove style={{ color: "gray", transform: "scale(0.8)", cursor:"pointer" }} />
            </CountOperator>
          </RangeContainer>
        </NumericInput>
      ))} */
}
