import React from "react";
import styled from "styled-components";
import { largeMobile, mobile } from "../responsive";

const Container = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));

  ${largeMobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  })}

  ${mobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  })}
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border: 1px solid lightgray;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.p`
  font-size: 17px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  ${mobile({
    fontSize: "15px",
  })}
`;

const Date = styled.p`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
  ${mobile({
    fontSize: "13px",
  })}
`;

const AuthorReview = styled.p`
  padding: 10px 0px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: gray;
  ${mobile({
    fontSize: "14px",
  })};
`;

const AuthorHotelReview = () => {
  return (
    <>
      <Container>
        {data.map((data, index) => (
          <ReviewContainer key={index}>
            <AuthorDetails>
              <Name>{data.name}</Name>
              <Date>{data.date}</Date>
            </AuthorDetails>
            <AuthorReview>{data.review}</AuthorReview>
          </ReviewContainer>
        ))}
      </Container>
    </>
  );
};

export default AuthorHotelReview;
