import React from "react";
import styled from "styled-components";

const PrimaryDetailContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  border: 2px solid red;
  padding: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.label`
  flex: 1;
  font-size: 18px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
`;

const Input = styled.input`
  flex: 9;
  width: 100%;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 10px 0px;
  border-bottom: 1px solid black;
`;

const TextArea = styled.textarea`
  flex: 9;
  width: 100%;
  outline: none;
  border: none;
  font-size: 18px;
  border-bottom: 1px solid black;
`;

const PrimaryDetail = () => {
  return (
    <PrimaryDetailContainer>
      {/* Name */}
      <InputWrapper>
        <Header>Name</Header>
        <Input />
      </InputWrapper>

      {/* Location */}
      <InputWrapper>
        <Header>Location</Header>
        <Input />
      </InputWrapper>

      {/* About */}
      <InputWrapper>
        <Header>About</Header>
        <TextArea />
      </InputWrapper>

      {/* Cost */}
      <InputWrapper>
        <Header>Cost:</Header>
        <Input type="number" />
      </InputWrapper>

      {/* Rooms Available: */}
      <InputWrapper>
        <Header>Rooms:</Header>
        <Input type="number" />
      </InputWrapper>

      {/* Checkout Time: */}
      <InputWrapper>
        <Header>Checkout Time:</Header>
        <Input type="time" />
      </InputWrapper>
    </PrimaryDetailContainer>
  );
};

export default PrimaryDetail;
