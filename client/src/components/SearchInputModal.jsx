import { CalendarMonth, Close, PersonAdd, Search } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { largeMobile, mobile, tablet } from "../responsive";
import DatePickerComponent from "./DatePickerComponent";
import { search } from "../redux/filterAndSearchSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9f9f9f4;
  padding: 50px 0px 25px 0px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  position: relative;
  width: 350px;

  ${mobile({
    width: "85%",
  })};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px 10px;
  border: 1px solid lightgray;
  width: 80%;
  border-radius: 10px;
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
  padding: 15px 0px;
  color: white;
  background-color: black;
  margin: 10px 0px;
  cursor: pointer;
  width: 85%;
  border: none;
`;

const SearchInputModal = ({ setModal }) => {
  const [guest, setGuest] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(
      search({
        location: location,
        beginDate: "date",
        endDate: "date",
        guest: guest,
      })
    );
    navigate(`/search?location=${location}`);
  };

  return (
    <Container>
      <CloseButton onClick={() => setModal(false)}>
        <Close style={{ transform: "scale(1.2)" }} />
      </CloseButton>

      <InputContainer>
        <Search />
        <Input
          placeholder={"Search Destination"}
          onChange={(event) => setLocation(event.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <CalendarMonth />
        <Input placeholder={"Begin date"} />
      </InputContainer>

      <InputContainer>
        <CalendarMonth />
        <Input placeholder={"End date"} />
      </InputContainer>

      <InputContainer>
        <PersonAdd />
        <Input
          placeholder={"Add Guest"}
          onChange={(event) => setGuest(event.target.value)}
        />
      </InputContainer>

      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </Container>
  );
};

export default SearchInputModal;
