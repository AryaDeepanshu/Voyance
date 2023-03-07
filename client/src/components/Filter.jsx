import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import CategorySlider from "./CategorySlider";
import { Close, CurrencyRupee, Tune } from "@mui/icons-material";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { searchHotel } from "../redux/searchHotel";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 3% 0% 3%;
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

const LightBoxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  background: transparent;
`;

const LightBoxWrapper = styled.div`
  height: 65%;
  width: 60%;
  padding: 20px;
  border-radius: 5%;
  position: relative;
  /* Glass-Morphism */
  background: white;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);

  ${mobile({
    width: "90%",
  })}

  ${largeMobile({
    width: "80%",
  })}

  ${tablet({
    width: "70%",
  })}

  ${desktop({
    width: "45%",
  })}
`;

const LightBox = styled.div`
  height: 85%;
  width: 100%;
  overflow: scroll;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
`;

const FilterText = styled.div`
  font-weight: bold;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  margin: auto;
`;

const FilterContainer = styled.div`
  padding: 10px;
`;

const FilterHeading = styled.p`
  font-size: 22px;
  margin-bottom: 10px;
  font-family: "Montserrat", sans-serif;
`;

const Price = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceContainer = styled.div`
  border: 1px solid gray;
  padding: 7px 5px;
  &:nth-child(${(props) => props.child}) {
    outline: 3px solid black;
  }
`;

const PriceHeading = styled.p`
  color: gray;
  font-size: 14px;
  padding-left: 4px;
  font-family: "Montserrat", sans-serif;
`;

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  height: 100%;
  width: 100%;
`;

const CheckBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const CheckBox = styled.input`
  transform: scale(1.8);
  margin-left: 7px;
  color: gray;
`;

const Text = styled.p`
  font-size: 16px;
  color: gray;
  padding-left: 15px;
  font-family: "Montserrat", sans-serif;
`;

const Hr = styled.hr`
  color: lightgray;
  width: 95%;
  margin: 10px auto;
  opacity: 0.3;
`;

const SelectContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${(props) => {
    switch (props.type) {
      case "room":
        return "repeat(auto-fill, minmax(50px, 1fr))";
      case "property":
        return "repeat(auto-fill, minmax(100px, 1fr))";
      case "rating":
        return "repeat(auto-fill, minmax(50px, 1fr))";
    }
  }};
`;

const SelectButton = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 14px;
  cursor: pointer;
  &:nth-child(${(props) => props.room + 1}) {
    color: white;
    background-color: black;
  }
  &:nth-child(${(props) => props.property + 1}) {
    color: white;
    background-color: black;
  }
  &:nth-child(${(props) => props.rating + 1}) {
    color: white;
    background-color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ApplyFilterButton = styled.button`
  padding: 15px;
  margin: 5px 10px;
  color: white;
  background-color: black;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const Filter = ({
  room,
  setRoom,
  property,
  SetProperty,
  rating,
  SetRating,
  minimumPrice,
  setMinimumPrice,
  maximumPrice,
  setMaximumPrice,
  essentials,
  setEssentials,
  meals,
  setMeals,
}) => {
  const search = useSelector((state) => state.search);

  const [filter, setFilter] = useState(0);
  const [focus, setFocus] = useState(0);

  const propertyArray = [
    "Any",
    "House",
    "Flat",
    "Guest House",
    "Apartment",
    "Hotel",
  ];

  const handleCheckEssential = (event) => {
    if (event.target.checked) {
      setEssentials([...essentials, event.target.value]);
    } else {
      setEssentials(
        essentials.filter((essential) => {
          if (essential != event.target.value) return essential;
        })
      );
    }
  };

  const handleCheckMeal = (event) => {
    if (event.target.checked) {
      setMeals([...meals, event.target.value]);
    } else {
      setMeals(
        meals.filter((meal) => {
          if (meal != event.target.value) return meal;
        })
      );
    }
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    searchHotel(dispatch, {
      minPrice: minimumPrice,
      maxPrice: maximumPrice,
      room: room,
      propertyType: propertyArray[property],
      essentials: essentials,
      mealsIncluded: meals,
      rating: rating,
    });
  };

  return (
    <>
      {filter ? (
        <LightBoxContainer>
          <LightBoxWrapper>
            <FilterHeader>
              <FilterText>Filter</FilterText>
              <Close
                style={{ cursor: "pointer" }}
                onClick={() => setFilter(0)}
              />
            </FilterHeader>
            <LightBox>
              <Hr />

              {/* Price Range Component: */}
              <FilterContainer>
                <FilterHeading>Price range </FilterHeading>
                <Price>
                  <PriceContainer
                    onFocus={() => setFocus(1)}
                    onBlur={() => setFocus(0)}
                    child={focus}>
                    <PriceHeading>min price</PriceHeading>
                    <PriceInput>
                      <CurrencyRupee
                        style={{ transform: "scale(0.7)", color: "gray" }}
                      />
                      <Input
                        onChange={(event) =>
                          setMinimumPrice(event.target.value)
                        }
                        placeholder="1000"
                      />
                    </PriceInput>
                  </PriceContainer>
                  <PriceContainer
                    onFocus={() => setFocus(2)}
                    onBlur={() => setFocus(0)}
                    child={focus}>
                    <PriceHeading>max price</PriceHeading>
                    <PriceInput>
                      <CurrencyRupee
                        style={{ transform: "scale(0.7)", color: "gray" }}
                      />
                      <Input
                        onChange={(event) =>
                          setMaximumPrice(event.target.value)
                        }
                        placeholder="25000"
                      />
                    </PriceInput>
                  </PriceContainer>
                </Price>
              </FilterContainer>

              <Hr />

              {/* Rooms Available Component: */}
              <FilterContainer>
                <FilterHeading>Rooms Available</FilterHeading>

                <SelectContainer type={"room"}>
                  <SelectButton room={room} onClick={() => setRoom(0)}>
                    Any
                  </SelectButton>
                  <SelectButton room={room} onClick={() => setRoom(1)}>
                    1
                  </SelectButton>
                  <SelectButton room={room} onClick={() => setRoom(2)}>
                    2
                  </SelectButton>
                  <SelectButton room={room} onClick={() => setRoom(3)}>
                    3
                  </SelectButton>
                  <SelectButton room={room} onClick={() => setRoom(4)}>
                    4
                  </SelectButton>
                  <SelectButton room={room} onClick={() => setRoom(5)}>
                    5+
                  </SelectButton>
                </SelectContainer>
              </FilterContainer>

              <Hr />

              {/* Property Type Component: */}
              <FilterContainer>
                <FilterHeading>Property Type</FilterHeading>
                <SelectContainer type={"property"}>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(0)}>
                    Any
                  </SelectButton>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(1)}>
                    House
                  </SelectButton>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(2)}>
                    Flat
                  </SelectButton>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(3)}>
                    Guest House
                  </SelectButton>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(4)}>
                    Apartment
                  </SelectButton>
                  <SelectButton
                    property={property}
                    onClick={() => SetProperty(5)}>
                    Hotel
                  </SelectButton>
                </SelectContainer>
              </FilterContainer>

              <Hr />

              {/* Essentials Component */}
              <FilterContainer>
                <FilterHeading>Essentials</FilterHeading>
                <CheckBoxWrapper>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Wifi"
                      onClick={handleCheckEssential}
                    />
                    <Text>Wifi</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Kitchen"
                      onClick={handleCheckEssential}
                    />
                    <Text>Kitchen</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Washing Machine"
                      onClick={handleCheckEssential}
                    />
                    <Text>Washing Machine</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Dryer"
                      onClick={handleCheckEssential}
                    />
                    <Text>Dryer</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Air Conditioning"
                      onClick={handleCheckEssential}
                    />
                    <Text>Air Conditioning</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Heating"
                      onClick={handleCheckEssential}
                    />
                    <Text>Heating</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Parking"
                      onClick={handleCheckEssential}
                    />
                    <Text>Parking</Text>
                  </CheckBoxContainer>
                </CheckBoxWrapper>
              </FilterContainer>

              <Hr />

              {/* Meal Included Component */}
              <FilterContainer>
                <FilterHeading>Meals Included</FilterHeading>
                <CheckBoxWrapper>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Breakfast"
                      onClick={handleCheckMeal}
                    />
                    <Text>Breakfast</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Lunch"
                      onClick={handleCheckMeal}
                    />
                    <Text>Lunch</Text>
                  </CheckBoxContainer>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      value="Dinner"
                      onClick={handleCheckMeal}
                    />
                    <Text>Dinner</Text>
                  </CheckBoxContainer>
                </CheckBoxWrapper>
              </FilterContainer>

              <Hr />

              {/* Rating Component */}
              <FilterContainer>
                <FilterHeading>Rating </FilterHeading>

                <SelectContainer type={"rating"}>
                  <SelectButton room={rating} onClick={() => SetRating(0)}>
                    Any
                  </SelectButton>
                  <SelectButton rating={rating} onClick={() => SetRating(1)}>
                    1
                  </SelectButton>
                  <SelectButton rating={rating} onClick={() => SetRating(2)}>
                    2
                  </SelectButton>
                  <SelectButton rating={rating} onClick={() => SetRating(3)}>
                    3
                  </SelectButton>
                  <SelectButton rating={rating} onClick={() => SetRating(4)}>
                    4
                  </SelectButton>
                  <SelectButton rating={rating} onClick={() => SetRating(5)}>
                    5+
                  </SelectButton>
                </SelectContainer>
              </FilterContainer>
            </LightBox>

            <ButtonContainer>
              <ApplyFilterButton onClick={handleSearch}>
                Apply Filter
              </ApplyFilterButton>
            </ButtonContainer>
          </LightBoxWrapper>
        </LightBoxContainer>
      ) : (
        <></>
      )}
      <Container>
        <CategorySlider />
        <FilterButton onClick={() => setFilter(true)}>
          <Tune style={{ paddingRight: "5px", transform: "scale(0.9)" }} />
          Filters
        </FilterButton>
      </Container>
    </>
  );
};

export default Filter;
