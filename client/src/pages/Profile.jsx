import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileInformation from "../components/ProfileInformation";

import { useEffect } from "react";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
`;

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <ProfileInformation />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Profile;
