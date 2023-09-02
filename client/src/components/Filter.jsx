import React from "react";
import styled from "styled-components";
import OptionSlider from "./OptionSlider";
import { Tune } from "@mui/icons-material";
import Modal from "./Modal";
import FilterProperties from "./FilterProperties";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 0% 2% 0%;
  position: relative;
`;

const FilterButton = styled.button`
  height: max-content;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10%;
  border: 1px solid lightgrey;
  margin: 10px;
  cursor: pointer;
  background-color: white;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;
`;

const Filter = ({ category, setCategory, modal, setModal }) => {
  return (
    <>
      {modal ? (
        <Modal>
          <FilterProperties modal={modal} setModal={setModal} />
        </Modal>
      ) : (
        <></>
      )}

      <Container>
        {/* <CategorySlider category={category} setCategory={setCategory} /> */}
        <OptionSlider category={category} setCategory={setCategory} />
        <FilterButton onClick={() => setModal(true)}>
          <Tune style={{ paddingRight: "5px", transform: "scale(0.9)" }} />
          Filters
        </FilterButton>
      </Container>
    </>
  );
};

export default Filter;
