import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import HostIntroduction from "../components/HostIntroduction";
import HotelForm from "../components/HotelForm";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/useWindowDimensions";

const OuterWrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const AddHotel = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <OuterWrapper>
        <Navbar scrollPosition={80} />
        <Wrapper>
          {width > 768 && <HostIntroduction />} <HotelForm />
        </Wrapper>
      </OuterWrapper>
      <Footer />
    </>
  );
};

export default AddHotel;
