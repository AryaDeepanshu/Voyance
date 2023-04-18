import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import HoverRating from "./StarRating";
import axios from "axios";
import { Edit, Delete, Close } from "@mui/icons-material";
import Modal from "./Modal";
import default_avatar from "../static/default_avatar.png";
import { Rating } from "@mui/material";
import dayjs from "dayjs";

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
  position: relative;
`;

const AuthorDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;

const DetailContainer = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 15px;
`;

const Name = styled.p`
  font-size: 17px;
  font-weight: bold;
  font-family: "Josefin Sans", sans-serif;
  ${mobile({
    fontSize: "15px",
  })}
`;

const Date = styled.p`
  font-size: 15px;
  font-family: "Josefin Sans", sans-serif;

  ${mobile({
    fontSize: "13px",
  })}
`;

const AuthorReview = styled.p`
  padding: 10px 0px;
  width: 98%;
  font-family: "Noto Serif", serif;
  font-size: 16px;
  color: gray;
  resize: none;

  ${mobile({
    fontSize: "14px",
  })}
`;

const TakeReviewContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props) => (props.type === "modal" ? "white" : "")};
  padding: ${(props) => (props.type === "modal" ? "30px" : "")};
  position: relative;
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
  width: ${(props) => (props.type === "modal" ? "94%" : "98%")};
  resize: none;
  padding: 20px 10px;

  ${mobile({
    width: "94%",
  })}

  ${largeMobile({
    width: "96%",
  })}
`;

const OptionWrapper = styled.div`
  top: 5px;
  right: 5px;
  position: absolute;
  display: flex;
  gap: 5px;
`;

const OptionContainer = styled.div`
  padding: 7px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 150px;
  padding: 10px 0px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #4ee2ec;

  :hover {
    opacity: 0.5;
    transition: 0.5 all;
  }
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

  /* State for updated Star Rating Component: */
  const [updatedValue, setUpdatedValue] = useState(0);

  /* State for updated  review input: */
  const [updatedExperience, setUpdatedExperience] = useState("");

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

  /* queryClient Object: */
  const queryClient = useQueryClient();

  /* React Query for add-review Post Request: */
  const addReviewMutation = useMutation({
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

  /* React Query for update-review Post Request: */
  const updateReviewMutation = useMutation({
    mutationFn: (review) => {
      return axios.post(`http://localhost:5000/review/update`, review, {
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

  /* React Query for delete-review Post Request: */
  const deleteReviewMutation = useMutation({
    mutationFn: (hotelId) => {
      return axios.post(`http://localhost:5000/review/delete`, hotelId, {
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

  /* Add Review Method: */
  const addReview = () => {
    setDisable(true);

    addReviewMutation.mutate({
      hotelId: hotelId,
      star: value,
      review: experience,
    });

    setDisable(false);
  };

  /* update Review Method: */
  const updateReview = () => {
    setDisable(true);

    updateReviewMutation.mutate({
      hotelId: hotelId,
      star: updatedValue,
      review: updatedExperience,
    });

    setDisable(false);
    setModal(false);
  };

  /* delete Review Method: */
  const deleteReview = () => {
    deleteReviewMutation.mutate({
      hotelId: hotelId,
    });
  };

  /* State to handle update review: */
  const [modal, setModal] = useState(false);

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
                    <Image
                      src={
                        data.userId.avatar === "default_avatar"
                          ? default_avatar
                          : data.userId.avatar
                      }
                    />
                  </ImageContainer>
                  <DetailContainer>
                    <Name>{data.userId.name}</Name>
                    <Date>{dayjs(data.updatedAt).format("MMMM YYYY")}</Date>
                  </DetailContainer>
                </AuthorDetails>
                <AuthorReview>{data.review}</AuthorReview>
                {data?.userId?._id === user?._id && (
                  <OptionWrapper>
                    <OptionContainer>
                      <Edit onClick={() => setModal(true)} />
                    </OptionContainer>
                    <OptionContainer>
                      <Delete onClick={deleteReview} />
                    </OptionContainer>
                  </OptionWrapper>
                )}
              </ReviewContainer>
            ))}
      </Container>

      {modal && (
        <Modal>
          <TakeReviewContainer type="modal">
            <Heading> update Review: </Heading>
            <StarRatingContainer>
              <Label>Rate our service: </Label>
              <HoverRating value={updatedValue} setValue={setUpdatedValue} />
            </StarRatingContainer>
            <InputReview
              type="modal"
              placeholder="share your experience..."
              rows="4"
              onChange={(event) => setUpdatedExperience(event.target.value)}
            />
            <Button onClick={updateReview} disabled={disable}>
              update
            </Button>
            {feedback && <h4>{feedback}</h4>}
            <OptionWrapper>
              <OptionContainer>
                <Close onClick={() => setModal(false)} />
              </OptionContainer>
            </OptionWrapper>
          </TakeReviewContainer>
        </Modal>
      )}

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
        </>
      )}
    </>
  );
};

export default HotelReview;
