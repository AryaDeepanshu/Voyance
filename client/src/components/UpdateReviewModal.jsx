import Modal from "./Modal";
import styled from "styled-components";
import HoverRating from "./StarRating";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { largeMobile, mobile } from "../utils/responsive";
import { useState } from "react";
import { Required, ReviewError, ReviewUpdated } from "../utils/notification";

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

const UpdateReviewModal = ({
  setModal,
  setValue,
  updatedValue,
  setExperience,
  setUpdatedValue,
  updatedExperience,
  setUpdatedExperience,
}) => {
  /* state to disable the add review button */
  const [disable, setDisable] = useState(false);

  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Get hotelId from the url */
  const hotelId = useLocation().pathname.split("/")[2];

  /* queryClient Object: */
  const queryClient = useQueryClient();

  /* React Query for update-review Post Request: */
  const updateReviewMutation = useMutation({
    mutationFn: (review) => {
      return axiosBaseURL.post(`review/update`, review, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      ReviewUpdated();
      queryClient.invalidateQueries([`review-${hotelId}`]);
    },
    onError: () => {
      ReviewError();
    },
  });

  /* update Review Method: */
  const updateReview = () => {
    if (updatedExperience === "" || updatedValue === 0) {
      Required();
      return;
    }

    setDisable(true);
    updateReviewMutation.mutate({
      userId: user._id,
      hotelId: hotelId,
      star: updatedValue,
      review: updatedExperience,
    });

    setValue(0);
    setModal(false);
    setDisable(false);
    setExperience("");
    setUpdatedValue(0);
    setUpdatedExperience("");
  };

  return (
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
          value={updatedExperience}
          onChange={(event) => setUpdatedExperience(event.target.value)}
        />
        <Button onClick={updateReview} disabled={disable}>
          update
        </Button>
        <OptionWrapper>
          <OptionContainer>
            <Close onClick={() => setModal(false)} />
          </OptionContainer>
        </OptionWrapper>
      </TakeReviewContainer>
    </Modal>
  );
};

export default UpdateReviewModal;
