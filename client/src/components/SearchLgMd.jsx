import dayjs from "dayjs";
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search } from "../redux/filterAndSearchSlice";
import DatePickerComponent from "./DatePickerComponent";
import { Add, Remove, Search } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 100%;
  bottom: 20px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 720px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  border-radius: 20px;
  background-color: white;
  justify-content: space-around;
`;

const InputWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  color: #646464;
  font-family: "Roboto", sans-serif;
`;

const Input = styled.input`
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  padding: 17.5px 5px;
  outline: none;
  width: ${(props) => (props.type === "guest" ? "60px" : "")};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  ::placeholder {
    font-size: 14px;
    color: darkgray;
  }
  &:hover {
    border: 1px solid black;
  }
`;

const SearchButton = styled.button`
  border: none;
  padding: 10px;
  margin-bottom: 4px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #0ead69;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const SearchLgMd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guest, setGuest] = useState(1);
  const [location, setLocation] = useState("");
  const [beginDate, setBeginDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  const handleSearch = () => {
    if (location === "") return;
    dispatch(
      search({
        location: location,
        beginDate: beginDate.format("MM/DD/YYYY"),
        endDate: endDate.format("MM/DD/YYYY"),
        stay: endDate.diff(beginDate, "day"),
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
      <Container>
        <InputWrapper>
          <Label>Location</Label>
          <Input
            placeholder="Where are you going?"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Check in</Label>
          <DatePickerComponent
            date={beginDate}
            setDate={setBeginDate}
            width="150px"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Check out</Label>
          <DatePickerComponent
            date={endDate}
            setDate={setEndDate}
            width="150px"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Guest</Label>
          <ButtonWrapper>
            <Input type="guest" value={guest} readOnly />
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
        </InputWrapper>
        <SearchButton>
          <Search
            style={{ color: "white", transform: "scale(1.5)" }}
            onClick={handleSearch}
          />
        </SearchButton>
      </Container>
    </Wrapper>
  );
};

export default SearchLgMd;
