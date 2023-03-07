import {
  CalendarMonthOutlined,
  KeyboardArrowDownOutlined,
  PlaceOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { format } from "date-fns";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { searchHotel } from "../redux/searchHotel";
import { desktop } from "../responsive";
import DateRangeComponent from "./DateRangeComponent";

const Container = styled.div`
  display: flex;
  padding: 6px;
  border-radius: 100px;
  background-color: white;
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  ${desktop({
    width: "60%",
  })}
`;

const SearchElementContainer = styled.div`
  flex: 6;
  display: flex;
  width: max-content;
`;

const RefContainer = styled.div``;

const SearchElement = styled.div`
  border-right: ${(props) =>
    props.value === "location" ? "" : ".5px solid gray"};
  margin-left: ${(props) => (props.value === "location" ? "5px" : "")};
  width: ${(props) => (props.value === "date" ? "75%" : "60%")};
  display: flex;
  align-items: center;
  position: relative;
`;

const ElementContainer = styled.div`
  margin-left: 8px;
`;

const Label = styled.p`
  color: gray;
  font-size: 0.7rem;
  padding-left: 2px;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: bold;
  font-size: 0.9rem;
  width: ${(props) => (props.type === "selectDate" ? "100%" : "100%")};
  ::placeholder {
    color: black;
    font-weight: bold;
    font-size: 0.8rem;
  }
`;

const SearchIcon = styled.button`
  margin: 0px 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #4ee2ec;
  border: none;
  cursor: pointer;
`;

function SearchInput() {
  const search = useSelector((state) => state.search);

  const [location, setLocation] = useState("");
  const ref = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [displayDate, setDisplayDate] = useState({
    startDate: search.startDate,
    endDate: search.endDate,
  });

  // useEffect(() => {
  // setDisplayDate({
  //   startDate: format(date[0].startDate, "dd/MM/yyyy"),
  //   endDate: format(date[0].endDate, "dd/MM/yyyy"),
  // });
  // }, [date]);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (event) => {
    if (event.key === "Escape") setToggle(false);
  };

  const hideOnClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setToggle(false);
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    searchHotel(dispatch, {
      location: location,
      startDate: format(date[0].startDate, "dd/MM/yyyy"),
      endDate: format(date[0].endDate, "dd/MM/yyyy"),
    });
  };

  return (
    // <Container>
    //   <SearchElementContainer>
    //     <SearchElement value="location">
    //       <PlaceOutlined
    //         style={{ transform: "scale(1.2)", color: "#4ee2ec" }}
    //       />
    //       <ElementContainer>
    //         <Label>
    //           Location <KeyboardArrowDownOutlined />
    //         </Label>
    //         <Input
    //           placeholder={search.location ? search.location : "Where"}
    //           onChange={(event) => setLocation(event.target.value)}
    //         />
    //       </ElementContainer>
    //     </SearchElement>

    //     <SearchElement value="date">
    //       <CalendarMonthOutlined
    //         style={{ transform: "scale(1.2)", color: "#4ee2ec" }}
    //       />
    //       <RefContainer onClick={() => setToggle(true)} ref={ref}>
    //         <ElementContainer>
    //           <Label>
    //             Date <KeyboardArrowDownOutlined />
    //           </Label>
    //           <Input
    //             placeholder={
    //               search.startDate && search.endDate
    //                 ? `${search.startDate} to ${search.endDate}`
    //                 : "When"
    //             }
    //           />
    //         </ElementContainer>
    //         {toggle && <DateRangeComponent date={date} setDate={setDate} />}
    //       </RefContainer>
    //     </SearchElement>
    //   </SearchElementContainer>
    //   <SearchIcon>
    //     <SearchOutlined
    //       style={{ transform: "scale(1.5)", color: "white", cursor: "pointer" }}
    //       onClick={handleSearch}
    //     />
    //   </SearchIcon>
    // </Container>

    <Container>
      <SearchElementContainer>
        <SearchElement value="date">
          <CalendarMonthOutlined
            style={{ transform: "scale(1.2)", color: "#4ee2ec" }}
          />
          <RefContainer onClick={() => setToggle(true)} ref={ref}>
            <ElementContainer>
              <Label>
                Date <KeyboardArrowDownOutlined />
              </Label>
              <Input
                placeholder={
                  displayDate.startDate && displayDate.endDate
                    ? `${displayDate.startDate} to ${displayDate.endDate}`
                    : "When"
                }
              />
            </ElementContainer>
            {toggle && (
              <DateRangeComponent
                date={date}
                setDate={setDate}
                setDisplayDate={setDisplayDate}
              />
            )}
          </RefContainer>
        </SearchElement>

        <SearchElement value="location">
          <PlaceOutlined
            style={{ transform: "scale(1.2)", color: "#4ee2ec" }}
          />
          <ElementContainer>
            <Label>
              Location <KeyboardArrowDownOutlined />
            </Label>
            <Input
              placeholder={search.location ? search.location : "Where"}
              onChange={(event) => setLocation(event.target.value)}
            />
          </ElementContainer>
        </SearchElement>
      </SearchElementContainer>
      <SearchIcon>
        <SearchOutlined
          style={{ transform: "scale(1.5)", color: "white", cursor: "pointer" }}
          onClick={handleSearch}
        />
      </SearchIcon>
    </Container>
  );
}

export default SearchInput;
