import React from "react";
import TripCard from "../components/TripCard";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  position: relative;
`;

const Order = () => {
  /* Get the current user from the redux store: */
  const user = useSelector((store) => store.user.currentUser);

  const { isLoading, error, data, refetch } = useQuery(
    [`Order_${user._id}`],
    () =>
      axios.get(`http://localhost:5000/payment/${user._id}`).then((order) => {
        return order.data;
      })
  );

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <Wrapper>
            <Navbar scrollPosition={80} />
            <TripCard data={data} />
          </Wrapper>
          <Footer />
        </>
      )}
    </>
  );
};

export default Order;
