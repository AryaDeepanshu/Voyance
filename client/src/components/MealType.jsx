import React, { useRef } from "react";
import styled from "styled-components";
import { mealList } from "../data/mealList";

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

const MealType = ({ mealTypeList, setMealTypeList, setMealTypeListError }) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const mealHandler = (index) => {
    setMealTypeListError(false);

    /* Logic for Handling the outline of the selected Meal Type: */
    if (
      revealRefs.current[index].style.outline === "" ||
      revealRefs.current[index].style.outline === "none"
    ) {
      revealRefs.current[index].style.outline = "2px solid black";
    } else {
      revealRefs.current[index].style.outline = "none";
    }

    /* Get the Meal Type*/
    const type = mealList[index].label;

    /* Check if it already exist in the Array */
    const mealIndex = mealTypeList.indexOf(type);

    if (mealIndex !== -1) {
      /* if it already exist - remove it: */
      const list = mealTypeList.filter((meal) => {
        if (meal !== type) return meal;
      });
      setMealTypeList(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...mealTypeList, type];
      setMealTypeList(list);
    }
  };

  return (
    <Wrapper>
      {mealList.map((meal, index) => (
        <Container
          key={index}
          onClick={() => mealHandler(index)}
          ref={addToRef}>
          <Icon>{meal.icon}</Icon>
          <Label>{meal.label}</Label>
        </Container>
      ))}
    </Wrapper>
  );
};

export default MealType;
