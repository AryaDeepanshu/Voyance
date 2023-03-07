import { CalendarMonth, Close, Search } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { largeMobile, mobile, tablet } from "../responsive";
import DatePickerComponent from "./DatePickerComponent";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1000;
  background-color: white;
  /* border: 10px sold red; */
`;

const Container = styled.div`
  height: max-content;
  /* width: 70%; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 50px 0px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  position: relative;

  ${tablet({
    width: "50%",
  })}

  ${largeMobile({
    width: "65%",
  })}

  ${mobile({
    width: "85%",
  })}
`;

const InputContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid lightgray;
  width: 80%;
  border-radius: 20px;
  margin: 10px 0px;
  background-color: white;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  margin-left: 10px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 15px 50px;
  margin-top: 25px;
  color: white;
  font-weight: bold;
  background-color: black;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const SearchInputModal = ({ openModal }) => {
  const search = useSelector((state) => state.search);

  return (
    <Wrapper>
      <Container>
        <CloseButton onClick={() => openModal(0)}>
          <Close style={{ transform: "scale(1.2)" }} />
        </CloseButton>
        <InputContainer>
          <Search />
          <Input
            placeholder={
              search.location ? search.location : "Search destination"
            }
          />
        </InputContainer>
        <InputContainer>
          <CalendarMonth />
          <Input
            placeholder={search.startDate ? search.startDate : "Begin date"}
          />
          {/* <DatePickerComponent /> */}
        </InputContainer>
        <InputContainer>
          <CalendarMonth />
          <Input placeholder={search.endDate ? search.endDate : "End date"} />
          {/* <DatePickerComponent /> */}
        </InputContainer>
        <SearchButton>Search</SearchButton>
      </Container>
    </Wrapper>
  );
};

export default SearchInputModal;
