import { Search } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { largeMobile, mobile, tablet } from "../utils/responsive";

const Wrapper = styled.div`
  width: 100%;
  bottom: 20px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  padding: 10px 20px;
  border-radius: 100px;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  cursor: pointer;
  background-color: white;

  ${tablet({
    width: "60%",
  })}

  ${largeMobile({
    width: "70%",
  })}

  ${mobile({
    width: "80%",
  })}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;

const Header = styled.p`
  font-weight: 600;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
`;

const Input = styled.p`
  width: max-content;
  color: gray;
  outline: none;
  border: none;
  padding-top: 2px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
`;

const SearchSm = ({ setModal }) => {
  return (
    <Wrapper>
      <Container>
        <Search style={{ transform: "scale(1.2)", paddingRight: "10px" }} />
        <InputContainer onClick={() => setModal(true)}>
          <Header>Anywhere</Header>
          <Input>Any week . Add guests</Input>
        </InputContainer>
      </Container>
    </Wrapper>
  );
};

export default SearchSm;
