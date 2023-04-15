import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HotelForm from "../components/HotelForm";

const OuterWrapper = styled.div`
  position: relative;
`;

// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
// `;

const File = styled.input``;

const EditHotel = () => {
  return (
    <>
      <OuterWrapper>
        <Navbar />
        {/* <Wrapper> */}
        <HotelForm />
        {/* </Wrapper> */}
      </OuterWrapper>
      <Footer />
    </>
  );
};

export default EditHotel;
