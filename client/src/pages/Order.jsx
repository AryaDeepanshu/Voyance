import React from "react";
import TripCard from "../components/TripCard";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  position: relative;
`;

const Order = () => {
  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <TripCard />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Order;
