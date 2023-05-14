import styled from "styled-components";
import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WishlistContainer from "../components/WishlistContainer";

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
      </Wrapper>
      <Footer />
    </>
  );
};

export default Wishlist;
