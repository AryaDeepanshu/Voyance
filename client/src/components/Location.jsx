import React from "react";
import styled from "styled-components";

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

const Location = ({ lat, setLat, long, setLong }) => {
  return (
    <>
      {/* Latitude: */}
      <NumericInput>
        <Label>latitude:</Label>
        <Input
          required
          type="number"
          value={lat}
          onChange={(event) => {
            setLat(event.target.value);
          }}
        />
      </NumericInput>

      {/* Longitude: */}
      <NumericInput>
        <Label>longitude:</Label>
        <Input
          required
          type="number"
          value={long}
          onChange={(event) => {
            setLong(event.target.value);
          }}
        />
      </NumericInput>
    </>
  );
};

export default Location;
