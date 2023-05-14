import {
  Add,
  CalendarMonth,
  Close,
  PersonAdd,
  Remove,
  Search,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { largeMobile, mobile, tablet } from "../utils/responsive";
import DatePickerComponent from "./DatePickerComponent";
import { search } from "../redux/filterAndSearchSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Wrapper = styled.div`
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #b2b2b2;
  width: 80%;
  border-radius: 3px;
  background-color: white;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 10px;
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
  padding: 16px 0px;
  color: white;
  font-size: 18px;
  background-color: #0ead69;
  border-radius: 10px;
  margin: 15px 0px;
  cursor: pointer;
  width: 80%;
  border: none;
  font-family: "Noto Serif", serif;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-right: 12px;
`;

const SearchInputModal = ({ setModal }) => {
  // today's Date:
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const today = date.getFullYear() + "-" + month + "-" + day;

  // tomorrow's Date:
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const tomorrowDay = String(nextDate.getDate()).padStart(2, "0");
  const tomorrowMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
  const tomorrow =
    nextDate.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDay;

  const [guest, setGuest] = useState(1);
  const [location, setLocation] = useState("");
  const [beginDate, setBeginDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  /* Calculate difference b/w date in case of "string" format: */
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  function parseDate(str) {
    var ydm = str.split("-");
    return new Date(Number(ydm[0]), Number(ydm[1]) - 1, Number(ydm[2])); // year month day
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decode = (date) => {
    const ymd = date.split("-");
    return `${ymd[1]}/${ymd[2]}/${ymd[0]} `;
  };

  const handleSearch = () => {
    if (location === "") return;
    console.log(location);

    dispatch(
      search({
        location: location,
        beginDate: decode(beginDate),
        endDate: decode(endDate),
        stay: datediff(parseDate(beginDate), parseDate(endDate)),
        guest: guest,
      })
    );
    navigate(`/search?location=${location}`);
  };

  const handleGuest = (operation) => {
    if (operation === "increase" && guest < 10) {
      setGuest(guest + 1);
    } else if (operation === "decrease" && guest > 1) {
      setGuest(guest - 1);
    }
  };

  return (
    <Wrapper>
      <CloseButton onClick={() => setModal(false)}>
        <Close style={{ transform: "scale(1.2)" }} />
      </CloseButton>

      <Container>
        <InputContainer>
          <Input
            placeholder={"Search Destination"}
            onChange={(event) => setLocation(event.target.value)}
          />
          <Search
            style={{
              transform: "scale(1.3)",
              paddingRight: "10px",
              color: "#73777B",
            }}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="date"
            value={beginDate}
            min={today}
            onChange={(event) => setBeginDate(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="date"
            value={endDate}
            min={beginDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Input placeholder={"Add Guest"} value={guest} readOnly />

          <ButtonWrapper>
            <Remove
              onClick={() => handleGuest("decrease")}
              style={{
                border: "1px solid #b2b2b2",
                borderRadius: "100%",
                cursor: "pointer",
                padding: "4px",
              }}
            />
            <Add
              onClick={() => handleGuest("increase")}
              style={{
                border: "1px solid #b2b2b2",
                borderRadius: "100%",
                cursor: "pointer",
                padding: "4px",
              }}
            />
          </ButtonWrapper>
        </InputContainer>
      </Container>

      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </Wrapper>
  );
};

export default SearchInputModal;
