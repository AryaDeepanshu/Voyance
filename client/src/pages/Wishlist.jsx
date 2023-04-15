import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WishlistContainer from "../components/WishlistContainer";
import styled from "styled-components";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
`;

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <Navbar scrollPosition={80} />
        <WishlistContainer />
        <Footer />
      </Wrapper>
    </>
  );
};

export default Wishlist;
