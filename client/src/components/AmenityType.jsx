import React, { useRef } from "react";
import styled from "styled-components";
import { amenityList } from "../data/amenityList";

const Wrapper = styled.div`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
`;

const Container = styled.div`
  gap: 10px;
  width: 80%;
  display: flex;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
`;

const Icon = styled.div``;

const Label = styled.p`
  font-size: 16px;
  font-family: "Roboto", sans-serif;
`;

const AmenityType = ({
  amentiyTypeList,
  setAmentiyTypeList,
  setAmentiyTypeListError,
}) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const amenityHandler = (index) => {
    setAmentiyTypeListError(false);

    /* Logic for Handling the outline of the selected AmentityType: */
    if (
      revealRefs.current[index].style.outline === "" ||
      revealRefs.current[index].style.outline === "none"
    ) {
      revealRefs.current[index].style.outline = "2px solid black";
    } else {
      revealRefs.current[index].style.outline = "none";
    }

    /* Get the AmentityType*/
    const type = amenityList[index].label;

    /* Check if it already exist in the Array */
    const amenityIndex = amentiyTypeList.indexOf(type);

    if (amenityIndex !== -1) {
      /* if it already exist - remove it: */
      const list = amentiyTypeList.filter((amenity) => {
        if (amenity !== type) return amenity;
      });
      setAmentiyTypeList(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...amentiyTypeList, type];
      setAmentiyTypeList(list);
    }
  };

  return (
    <Wrapper>
      {amenityList.map((amenity, index) => (
        <Container
          key={index}
          onClick={() => amenityHandler(index)}
          ref={addToRef}>
          <Icon>{amenity.icon}</Icon>
          <Label>{amenity.label}</Label>
        </Container>
      ))}
    </Wrapper>
  );
};

export default AmenityType;
