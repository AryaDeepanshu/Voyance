import { CurrencyRupee } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  border-top: solid 1px lightgray;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

const CostContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Cost = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Duration = styled.div`
  font-size: 14px;
  color: gray;
  padding-left: 5px;
`;

const Button = styled.button`
  padding: 15px 30px;
  margin-right: 20px;
  border-radius: 10px;
  border: none;
  background-color: #4ee2ec;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;

  &:hover {
    opacity: 0.5;
    transition: all 0.2s;
  }
`;

const ReservationStrip = ({ setModal, data, stay }) => {
  const searchInfo = useSelector((store) => store.filterAndSearch);

  return (
    <Container>
      <DataContainer>
        <CostContainer>
          <CurrencyRupee style={{ transform: "scale(0.7)" }} />{" "}
          <Cost>{data.cost}</Cost>
          <Duration>night</Duration>
        </CostContainer>
      </DataContainer>
      <Button onClick={() => setModal(1)}>Reverse</Button>
    </Container>
  );
};

export default ReservationStrip;
