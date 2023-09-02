import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { search } from "../redux/filterAndSearchSlice";
import { desktop, largeMobile } from "../utils/responsive";
import { noResult } from "../data/url";

const Wrapper = styled.div`
  display: flex;
  height: max-content;
  padding-bottom: 50px;

  ${largeMobile({
    flexDirection: "column",
  })};
`;

const LeftContainer = styled.div`
  flex: 1.6;
  height: 100%;
  width: 100%;

  ${desktop({
    flex: "1.2",
  })}
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1.4;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.p`
  font-size: 28px;
  padding-bottom: 10px;
  font-family: "Bree Serif", serif;

  ${desktop({
    fontSize: "36px",
  })}
`;

const Text = styled.ul`
  list-style: none;
  font-size: 20px;
  font-family: "Bree Serif", serif;

  ${desktop({
    fontSize: "24px",
  })}
`;

const Val = styled.li`
  font-size: 16px;
  padding-top: 7px;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;

  ${desktop({
    fontSize: "18px",
  })}

  :hover {
    text-decoration: underline;
  }
`;

const NoResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const beginDate = dayjs();
  const endDate = dayjs().add(1, "day");

  const handleSearch = (location) => {
    if (location === "") return;
    dispatch(
      search({
        location: location,
        beginDate: beginDate.format("MM/DD/YYYY"),
        endDate: endDate.format("MM/DD/YYYY"),
        stay: endDate.diff(beginDate, "day"),
        guest: 1,
      })
    );

    navigate(`/search?location=${location}`);
  };

  return (
    <Wrapper>
      <LeftContainer>
        <Img src={noResult} />
      </LeftContainer>
      <RightContainer>
        <RightWrapper>
          <Header>Sorry! No Accomodation found.</Header>
          <Text>
            Checkout other destinations:
            <Val onClick={() => handleSearch("goa")}> Goa, India </Val>
            <Val onClick={() => handleSearch("uttarakhand")}>
              Uttarakhand, India
            </Val>
            <Val onClick={() => handleSearch("himachal pradesh")}>
              Himachal Pradesh, India
            </Val>
          </Text>
        </RightWrapper>
      </RightContainer>
    </Wrapper>
  );
};

export default NoResult;
