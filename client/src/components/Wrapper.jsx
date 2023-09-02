import React from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Container = styled.div``;

const Wrapper = ({ children, home }) => {
  return (
    <Container>
      <Navbar home={home} />
      {children}
      <Toaster />
      <Footer home={home} />
    </Container>
  );
};

export default Wrapper;
