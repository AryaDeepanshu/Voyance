import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TripCard from "../components/TripCard";
import TripCardLoader from "../components/Loaders/TripCardLoader";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { largeMobile, mobile } from "../utils/responsive";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  position: relative;
`;

const Heading = styled.div`
  font-size: 48px;
  margin-left: 10px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "32px",
    margin: "1% 0% 0% 6%",
  })}

  ${largeMobile({
    fontSize: "36px",
    margin: "1% 0% 0% 5%",
  })}
`;

const Order = () => {
  /* Get the current user from the redux store: */
  const user = useSelector((store) => store.user.currentUser);

  const { isLoading, error, data } = useQuery([`Order_${user._id}`], () =>
    axiosBaseURL
      .get(`order/${user._id}`, {
        withCredentials: true,
      })
      .then((order) => {
        return order.data;
      })
  );

  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <Heading>Your Orders:</Heading>
        {isLoading ? <TripCardLoader /> : <TripCard tripData={data} />}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Order;
