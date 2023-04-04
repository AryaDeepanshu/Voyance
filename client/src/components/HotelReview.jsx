import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { desktop, largeMobile, mobile } from "../responsive";
import HoverRating from "./StarRating";
import axios from "axios";

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));

  ${largeMobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  })}

  ${mobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  })}
`;

const Hr = styled.hr`
  border-top: 1px solid lightgray;
  width: 100%;
  margin: 20px 0px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AuthorDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  height: 45px;
  width: 45px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const DetailContainer = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10px;
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
  })}
`;

const TakeReviewContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Heading = styled.div`
  font-size: 36px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "24px",
  })}
`;

const StarRatingContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.p`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  font-family: "Bree Serif", serif;
`;

const InputReview = styled.textarea`
  width: 98%;
  resize: none;
  padding: 20px 10px;

  ${mobile({
    width: "94%",
  })}

  ${largeMobile({
    width: "96%",
  })}
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 15px 30px;
  background-color: #ff0b55;
  font-family: "Roboto", sans-serif;
  color: white;
  border: none;
`;

const HotelReview = () => {
  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Get hotelId from the url */
  const hotelId = useLocation().pathname.split("/")[2];

  /* State for Star Rating Component: */
  const [value, setValue] = useState(0);

  /* State for review input: */
  const [experience, setExperience] = useState("");

  /* React Query to fetch hotel review: */
  const { isLoading, error, data } = useQuery([`review-${hotelId}`], () =>
    axios
      .get(`http://localhost:5000/review/${hotelId}`)
      .then((hotel_review) => {
        return hotel_review.data;
      })
  );

  /* State to display add-review feedback: */
  const [feedback, setFeedback] = useState(null);

  /* React Query for add-review Post Request: */
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (review) => {
      return axios.post(`http://localhost:5000/review/add`, review, {
        withCredentials: true,
      });
    },
    onSuccess: (message) => {
      setFeedback(message.data);
      queryClient.invalidateQueries([`review-${hotelId}`]);
    },
    onError: (message) => {
      setFeedback(message.response.data);
    },
  });

  /* state to disable the add review button */
  const [disable, setDisable] = useState(false);

  const addReview = () => {
    setDisable(true);

    mutation.mutate({
      hotelId: hotelId,
      star: value,
      review: experience,
    });

    setDisable(false);
  };
  return (
    <>
      <Hr />
      <Container>
        {isLoading
          ? "loading"
          : data.map((data) => (
              <ReviewContainer key={data._id}>
                <AuthorDetails>
                  <ImageContainer>
                    <Image src={data.userId.avatar} />
                  </ImageContainer>
                  <DetailContainer>
                    <Name>{data.userId.name}</Name>
                    <Date>{data.userId.updatedAt}</Date>
                  </DetailContainer>
                </AuthorDetails>
                <AuthorReview>{data.review}</AuthorReview>
              </ReviewContainer>
            ))}
      </Container>

      {user && (
        // add constraint in form that star and message is required.
        <>
          <TakeReviewContainer>
            <Heading> Add Review: </Heading>
            <StarRatingContainer>
              <Label>Rate our service: </Label>
              <HoverRating value={value} setValue={setValue} />
            </StarRatingContainer>
            <InputReview
              placeholder="share your experience..."
              rows="4"
              onChange={(event) => setExperience(event.target.value)}
            />
            <Button onClick={addReview} disabled={disable}>
              Submit
            </Button>
            {feedback && <h4>{feedback}</h4>}
          </TakeReviewContainer>

          <Hr />
        </>
      )}
    </>
  );
};

export default HotelReview;
