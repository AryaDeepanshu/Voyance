import React, { useState } from "react";
import { largeMobile, mobile } from "../utils/responsive";
import styled from "styled-components";
import HoverRating from "./StarRating";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { Required, ReviewAdded, ReviewError } from "../utils/notification";

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

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 150px;
  padding: 15px 0px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #0ead69;

  :hover {
    opacity: 0.5;
    transition: 0.5 all;
  }
`;

const AddReview = ({
  value,
  setValue,
  experience,
  setExperience,
  setUpdatedValue,
  setUpdatedExperience,
}) => {
  /* state to disable the add review button */
  const [disable, setDisable] = useState(false);

  /* Get hotelId from the url */
  const hotelId = useLocation().pathname.split("/")[2];

  /* queryClient Object: */
  const queryClient = useQueryClient();

  /* React Query for add-review Post Request: */
  const addReviewMutation = useMutation({
    mutationFn: (review) => {
      return axiosBaseURL.post(`review/add`, review, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      ReviewAdded();
      queryClient.invalidateQueries([`review-${hotelId}`]);
    },
    onError: () => {
      ReviewError();
    },
  });

  /* Add Review Method: */
  const addReview = () => {
    if (experience === "" || value === 0) {
      Required();
      return;
    }

    setDisable(true);
    addReviewMutation.mutate({
      hotelId: hotelId,
      star: value,
      review: experience,
    });

    setValue(0);
    setExperience("");
    setDisable(false);
    setUpdatedValue(0);
    setUpdatedExperience("");
  };

  return (
    <TakeReviewContainer>
      <Heading> Add Review: </Heading>
      <StarRatingContainer>
        <Label>Rate our service: </Label>
        <HoverRating value={value} setValue={setValue} />
      </StarRatingContainer>
      <InputReview
        placeholder="share your experience..."
        rows="4"
        value={experience}
        onChange={(event) => setExperience(event.target.value)}
      />
      <Button onClick={addReview} disabled={disable}>
        Submit
      </Button>
    </TakeReviewContainer>
  );
};

export default AddReview;
