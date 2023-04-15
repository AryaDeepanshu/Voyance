import React from "react";
import styled from "styled-components";
import { desktop } from "../responsive";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${desktop({
    width: "90%",
  })}
`;

const LeftContainer = styled.div``;

const Host = styled.div`
  font-family: "Bree Serif", serif;
  font-size: 24px;
  padding-bottom: 5px;
`;

const Detail = styled.div`
  color: gray;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  padding-bottom: 15px;
`;

const ContactContainer = styled.div`
  gap: 5px;
  display: flex;
`;

const Contact = styled.div`
  font-size: 16px;
  font-family: "Bree Serif", serif;
`;

const ContactDetail = styled.div`
  color: gray;
  font-size: 14px;
  font-family: "Bree Serif", serif;
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div``;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 100%;
`;

const HotelHostDetail = ({ data }) => {
  return (
    <Wrapper>
      <LeftContainer>
        <Host>{`Property hosted by ${data.hostId.name}`}</Host>
        <Detail>{`${data.guest} guests | ${data.bedrooms} bedrooms | ${data.beds} beds | ${data.bathrooms} bathrooms`}</Detail>
        <ContactContainer>
          <Contact>Contact: </Contact>
          <ContactDetail>{`${"Phone Number"} | ${
            data.hostId.email
          }`}</ContactDetail>
        </ContactContainer>
      </LeftContainer>
      <RightContainer>
        <Avatar src={data.hostId.avatar} />
      </RightContainer>
    </Wrapper>
  );
};

export default HotelHostDetail;
