import React from "react";
import styled from "styled-components";

const RightWrapper = styled.div`
  flex: 1;
  top: 80px;
  left: 0px;
  height: calc(100vh - 80px);
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  width: 90%;
  align-self: center;
  font-size: 42px;
  font-family: "Bree Serif", serif; // Heading
`;

const HostIntroduction = () => {
  return (
    <RightWrapper>
      <P>Choose us once, and You will choose us Always. - Voyance</P>
    </RightWrapper>
  );
};

export default HostIntroduction;
