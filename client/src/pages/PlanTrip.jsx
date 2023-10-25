import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Plan from "../components/Plan";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 5% 5%;
  position: relative;
`;

const PlanTrip = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <Plan />
      </Wrapper>
      <Footer type="hotelInfo" />
    </>
  );
};

export default PlanTrip;
