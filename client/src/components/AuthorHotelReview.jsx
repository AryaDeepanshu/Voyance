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
  const data = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      name: "Whispering Pines Cottages|Treehouse|Tandi",
      date: "January 2021",
      review:
        "Beautiful place to stay - excellent views of the ocean, great place to hang out, friendly and excellent staff, comfortable. Had 5 staff actively helping with everything and serving throughout the day. Would recommend and stay again, thanks.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      name: "Vihang Farmhouse: Florican Room",
      date: "January 2022",
      review:
        "It was absoulutly fantastic! Big thanx to the staff, it was amazing. It was the coolest house we have seen. Hope to come again in the future:))",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      name: "Shivasa Farms Jaipur",
      date: "Feburary 2021",
      review:
        "Quiet location,comfortable rooms,beautiful scenery,fantastic pool,great service,a lot of good memories,thank you!we will come back again.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      name: "Stellar Assagao 3BHK Villa With A Private Pool!",
      date: "March 2016",
      review:
        "Felt really good staying at this place, the beach view cradles and the restaurant was amazing. Food was home made at this place and very reasonable in cost. The host was so welcoming and so friendly and she made our stay a great experience for us.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
      name: "Delightful 1 bed Wooden Cottage amidst Nature",
      date: "January 2021",
      review:
        "How can I say? A M A Z I N G is not enough. If you wanna feel like at home but in the middle of the paradise it is the right place. Amanda makes us feel part of her familiy. It's been amazing be there with all her kind family. It is a perfect mix with relax, sea, food, experiences and Sri Lankan vibes. We never wanted to leave. I suggest this place to everyone.",
    },
  ];

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
