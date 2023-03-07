import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fileUpload from "../utils/fileUpload";
import Footer from "../components/Footer";
import axios from "axios";
import HostIntroduction from "../components/HostIntroduction";
import HotelForm from "../components/HotelForm";

const OuterWrapper = styled.div`
  position: relative;
`;

const Navbar = styled.div`
  height: 80px;
  width: 100%;
  position: sticky;
  top: 0px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const File = styled.input``;

const EditHotel = () => {
  return (
    <>
      <OuterWrapper>
        <Navbar />
        <Wrapper>
          <HostIntroduction />
          <HotelForm />
        </Wrapper>
      </OuterWrapper>
      <Footer />
    </>
  );
};

export default EditHotel;
