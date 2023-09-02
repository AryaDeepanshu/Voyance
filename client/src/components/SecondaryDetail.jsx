import React from "react";
import styled from "styled-components";
import { mealList } from "../data/mealList";
import { amenityList } from "../data/amenityList";
import { propertyList } from "../data/propertyList";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const Header = styled.label`
  font-size: 20px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
`;

const OptionAvailable = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: 0px 10px 10px 0px;
  border-radius: 10px;
  cursor: pointer;
  /* outline: 1px solid black; */
`;

const Icon = styled.div``;

const Label = styled.p``;

const SecondaryDetail = (props) => {
  const {
    propertyType,
    setPropertyType,
    amenityType,
    setAmenityType,
    mealType,
    setMealType,
  } = props;

  const propertyHandler = (index) => {
    /* Get the Property Type*/
    const type = propertyList[index].label;

    /* Check if it already exist in the Array */
    const propertyIndex = propertyType.indexOf(type);

    if (propertyIndex != -1) {
      /* if it already exist - remove it: */
      const list = propertyType.filter((property) => {
        if (property != type) return property;
      });
      setPropertyType(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...propertyType, type];
      setPropertyType(list);
    }
  };

  const amenityHandler = (index) => {
    /* Get the Property Type*/
    const type = amenityList[index].label;

    /* Check if it already exist in the Array */
    const amenityIndex = amenityType.indexOf(type);

    if (amenityIndex != -1) {
      /* if it already exist - remove it: */
      const list = amenityType.filter((amenity) => {
        if (amenity != type) return amenity;
      });
      setAmenityType(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...amenityType, type];
      setAmenityType(list);
    }
  };

  const mealHandler = (index) => {
    /* Get the Property Type*/
    const type = mealList[index].label;

    /* Check if it already exist in the Array */
    const mealIndex = mealType.indexOf(type);

    if (mealIndex != -1) {
      /* if it already exist - remove it: */
      const list = mealType.filter((meal) => {
        if (meal != type) return meal;
      });
      setMealType(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...mealType, type];
      setMealType(list);
    }
  };

  return (
    <Wrapper>
      {/* Property Type: */}
      <InputWrapper>
        <OptionAvailable>
          {propertyList.map((property, index) => (
            <Option onClick={() => propertyHandler(index)} key={index}>
              <Icon>{property.icon}</Icon>
              <Label>{property.label}</Label>
            </Option>
          ))}
        </OptionAvailable>
      </InputWrapper>

      {/* Amenity Type: */}
      <InputWrapper>
        <Header>Amenities:</Header>
        <OptionAvailable>
          {amenityList.map((amenity, index) => (
            <Option onClick={() => amenityHandler(index)} key={index}>
              <Icon>{amenity.icon}</Icon>
              <Label>{amenity.label}</Label>
            </Option>
          ))}
        </OptionAvailable>
      </InputWrapper>

      {/* Meal Included: */}
      <InputWrapper>
        <Header>Meals Included:</Header>
        <OptionAvailable>
          {mealList.map((meal, index) => (
            <Option onClick={() => mealHandler(index)} key={index}>
              <Icon>{meal.icon}</Icon>
              <Label>{meal.label}</Label>
            </Option>
          ))}
        </OptionAvailable>
      </InputWrapper>
    </Wrapper>
  );
};

export default SecondaryDetail;
