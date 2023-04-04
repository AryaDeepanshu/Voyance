import { CancelOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import ReservationCard from "./ReservationCard";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// delete this component not required now
const ReservationModal = ({ data, setModal }) => {
  return (
    <Container>
      <ReservationCard data={data} setModal={setModal} />
    </Container>
  );
};

export default ReservationModal;
