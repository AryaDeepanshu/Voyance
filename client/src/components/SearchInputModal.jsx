import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { mobile } from "../utils/responsive";
import { useNavigate } from "react-router-dom";
import { search } from "../redux/filterAndSearchSlice";
import { Add, Close, Remove, Search } from "@mui/icons-material";
import {
  datediff,
  decode,
  parseDate,
  today,
  tomorrow,
} from "../utils/dateManipulation";

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  border-radius: 4px;
  position: relative;
  height: max-content;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 50px 0px 25px 0px;

  ${mobile({
    width: "85%",
  })};
`;

const Container = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  position: relative;
  align-items: center;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;
  padding: 20px 10px;
  background-color: #f4f4f4;
  font-family: "Montserrat", sans-serif;
`;

const CloseButton = styled.div`
  top: 10px;
  right: 10px;
  cursor: pointer;
  position: absolute;
`;

const SearchButton = styled.button`
  width: 80%;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
  margin: 15px 0px;
  padding: 16px 0px;
  border-radius: 10px;
  background-color: #0ead69;
  font-family: "Noto Serif", serif;
`;

const ButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  padding-right: 12px;
`;

const SearchInputModal = ({ setModal }) => {
  const [guest, setGuest] = useState(1);
  const [location, setLocation] = useState("");
  const [beginDate, setBeginDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location === "") return;

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
    if (operation === "increase" && guest < 10) setGuest(guest + 1);
    else if (operation === "decrease" && guest > 1) setGuest(guest - 1);
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
