import React from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import default_avatar from "../static/default_avatar.png";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useLocation } from "react-router-dom";
import { ReviewDeleted, ReviewError } from "../utils/notification";

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

const ReviewInformation = ({
  data,
  setModal,
  setValue,
  setExperience,
  setUpdatedValue,
  setUpdatedExperience,
}) => {
  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Get hotelId from the url */
  const hotelId = useLocation().pathname.split("/")[2];

  /* queryClient Object: */
  const queryClient = useQueryClient();

  /* React Query for delete-review Post Request: */
  const deleteReviewMutation = useMutation({
    mutationFn: (hotelId) => {
      return axiosBaseURL.post(`review/delete`, hotelId, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      ReviewDeleted();
      queryClient.invalidateQueries([`review-${hotelId}`]);
    },
    onError: (err) => {
      ReviewError();
    },
  });

  /* delete Review Method: */
  const deleteReview = () => {
    deleteReviewMutation.mutate({
      userId: user._id,
      hotelId: hotelId,
    });

    setValue(0);
    setExperience("");
    setUpdatedValue(0);
    setUpdatedExperience("");
  };

  return (
    <ReviewContainer key={data._id}>
      <AuthorDetails>
        <ImageContainer>
          <Image
            src={
              data?.userId?.avatar === "default_avatar"
                ? default_avatar
                : data?.userId?.avatar
            }
          />
        </ImageContainer>
        <DetailContainer>
          <Name>{data?.userId?.name}</Name>
          <Date>{dayjs(data.updatedAt).format("MMMM YYYY")}</Date>
        </DetailContainer>
      </AuthorDetails>

      <AuthorReview>{data?.review}</AuthorReview>

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
  );
};

export default ReviewInformation;
