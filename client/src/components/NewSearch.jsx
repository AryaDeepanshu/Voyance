import { Search } from "@mui/icons-material";
import styled from "styled-components";
import { desktop } from "../responsive";
import React, { useRef, useState } from "react";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search } from "../redux/filterAndSearchSlice";

const Wrapper = styled.div`
  width: 100%;
  bottom: 20px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  /* 
  ${desktop({
    bottom: "150px",
  })} */
`;

const Container = styled.div`
  width: 720px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
  border: none;
  outline: none;
  width: ${(props) => (props.type === "guest" ? "110px" : "")};
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  ::placeholder {
    font-size: 14px;
    color: darkgray;
  }
`;

const SearchButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: teal;
`;

const NewSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guest, setGuest] = useState("");
  const [location, setLocation] = useState("");

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
          <Input placeholder="Add Date" />
          {/* <DatePicker ref={ref} onChange={onChange} value={value} /> */}
        </InputWrapper>

        <InputWrapper>
          <Label>Check out</Label>
          <Input placeholder="Add Date" />
          {/* <DatePicker onChange={onChange} value={value} /> */}
          {/* </Input> */}
        </InputWrapper>
        <InputWrapper>
          <Label>Guest</Label>
          <Input
            placeholder="Add Guest"
            type="guest"
            onChange={(event) => setGuest(event.target.value)}
          />
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

export default NewSearch;
