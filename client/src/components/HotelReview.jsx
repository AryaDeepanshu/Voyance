import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { largeMobile, mobile } from "../utils/responsive";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useQuery } from "@tanstack/react-query";
import ReviewInformation from "./ReviewInformation";
import UpdateReviewModal from "./UpdateReviewModal";
import AddReview from "./AddReview";

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

const HotelReview = () => {
  /* State to handle update review: */
  const [modal, setModal] = useState(false);

  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Get hotelId from the url */
  const hotelId = useLocation().pathname.split("/")[2];

  /* State for Star Rating Component and review input: */
  const [value, setValue] = useState(0);
  const [experience, setExperience] = useState("");

  /* State for updated Star Rating Component and review input: */
  const [updatedValue, setUpdatedValue] = useState(0);
  const [updatedExperience, setUpdatedExperience] = useState("");

  /* React Query to fetch hotel review: */
  const { isLoading, data } = useQuery([`review-${hotelId}`], () =>
    axiosBaseURL.get(`review/${hotelId}`).then((hotel_review) => {
      return hotel_review.data;
    })
  );

  return (
    <>
      <Hr />

      {/* All Review for the Accomodation: */}
      <Container>
        {!isLoading &&
          data.map((data) => (
            <ReviewInformation
              data={data}
              key={data._id}
              setModal={setModal}
              setValue={setValue}
              setExperience={setExperience}
              setUpdatedValue={setUpdatedValue}
              setUpdatedExperience={setUpdatedExperience}
            />
          ))}
      </Container>

      {/* Update Review Modal: */}
      {modal && (
        <UpdateReviewModal
          setModal={setModal}
          setValue={setValue}
          updatedValue={updatedValue}
          setExperience={setExperience}
          setUpdatedValue={setUpdatedValue}
          updatedExperience={updatedExperience}
          setUpdatedExperience={setUpdatedExperience}
        />
      )}

      {/* Add Review: */}
      {user && !user.host && (
        <AddReview
          value={value}
          setValue={setValue}
          experience={experience}
          setExperience={setExperience}
          setUpdatedValue={setUpdatedValue}
          setUpdatedExperience={setUpdatedExperience}
        />
      )}
    </>
  );
};

export default HotelReview;
