import React, { useRef } from "react";
import styled from "styled-components";
import { propertyList } from "../data/propertyList";

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

const PropertyType = ({
  propertyTypeList,
  setPropertyTypeList,
  setPropertyTypeListError,
}) => {
  // Logic for handling mulitple refs:
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const propertyHandler = (index) => {
    setPropertyTypeListError(false);

    /* Logic for Handling the outline of the selected propertyType: */
    if (
      revealRefs.current[index].style.outline === "" ||
      revealRefs.current[index].style.outline === "none"
    ) {
      revealRefs.current[index].style.outline = "2px solid black";
    } else {
      revealRefs.current[index].style.outline = "none";
    }

    /* Get the Property Type*/
    const type = propertyList[index].label;

    /* Check if it already exist in the Array */
    const propertyIndex = propertyTypeList.indexOf(type);

    // const propertyIndex = propertyTypeList.findIndex((x) => x.type === type);
    // console.log(propertyIndex);

    if (propertyIndex !== -1) {
      /* if it already exist - remove it: */
      const list = propertyTypeList.filter((property) => {
        if (property !== type) return property;
      });
      setPropertyTypeList(list);
    } else {
      /* if it doesnot exist - add it: */
      const list = [...propertyTypeList, type];
      setPropertyTypeList(list);
    }
  };

  // useEffect(() => {
  //   console.log("propertyType:");
  //   console.log(propertyTypeList.length);

  //   propertyTypeList.map((property) => {
  //     const index = propertyTypeList.indexOf(property);
  //     revealRefs.current[index].style.outline = "2px solid black";
  //   });
  // }, []);

  return (
    <Wrapper>
      {propertyList.map((property, index) => (
        <Container
          key={index}
          onClick={() => propertyHandler(index)}
          ref={addToRef}>
          <Icon>{property.icon}</Icon>
          <Label>{property.label}</Label>
        </Container>
      ))}
    </Wrapper>
  );
};

export default PropertyType;
