import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Close, CurrencyRupee, Tune } from "@mui/icons-material";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { clear, clearFilters, search } from "../redux/filterAndSearchSlice";

const LightBoxWrapper = styled.div`
  height: 500px;
  width: 580px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;

  ${mobile({
    width: "90%",
  })}

  ${largeMobile({
    width: "80%",
  })}

  ${tablet({
    width: "70%",
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
  padding-bottom: 5px;
  border-bottom: 1px solid black;
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
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
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
  height: 15%;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid black;
`;

const Button = styled.button`
  padding: 15px;
  margin: 5px 10px;
  color: white;
  background-color: black;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const FilterProperties = ({ modal, setModal }) => {
  const searchInfo = useSelector((store) => store.filterAndSearch);
  const { minPrice, maxPrice, rating, essentials, mealIncluded } = searchInfo;

  const [meals, setMeals] = useState(mealIncluded);
  const [hotelRating, setHotelRating] = useState(rating);
  const [amentities, setAmentities] = useState(essentials);
  const [minimumPrice, setMinimumPrice] = useState(minPrice);
  const [maximumPrice, setMaximumPrice] = useState(maxPrice);

  const [focus, setFocus] = useState(0);

  const handleCheckAmenity = (event) => {
    if (event.target.checked) {
      setAmentities([...amentities, event.target.value]);
    } else {
      setAmentities(
        amentities.filter((essential) => {
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

  const handleFilter = () => {
    dispatch(
      search({
        minPrice: minimumPrice,
        maxPrice: maximumPrice,
        essentials: amentities,
        mealIncluded: meals,
        rating: hotelRating,
      })
    );
    setModal(0);
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setMinimumPrice(1000);
    setMaximumPrice(25000);
    setAmentities([]);
    setMeals([]);
    setHotelRating(0);
    setModal(0);
  };

  const amenitiesOptions = [
    "Wifi",
    "Kitchen",
    "Workspace",
    "Pets Allowed",
    "Smoke Alarm",
    "Fire Extinguisher",
    "First Aid kit",
    "Parking",
  ];

  const mealOptions = ["Breakfast", "Lunch", "Dinner"];

  // Logic for handling mulitple refs: -> amenities
  const amenityRefs = useRef([]);
  amenityRefs.current = [];

  const addToAmenities = (el) => {
    if (el && !amenityRefs.current.includes(el)) {
      amenityRefs.current.push(el);
    }
  };

  // Logic for handling mulitple refs: -> meals
  const mealRefs = useRef([]);
  mealRefs.current = [];

  const addToMeals = (el) => {
    if (el && !mealRefs.current.includes(el)) {
      mealRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (modal === true) {
      amentities.map((amentiy) => {
        const index = amenitiesOptions.indexOf(amentiy);
        amenityRefs.current[index].checked = true;
      });

      meals.map((meal) => {
        const index = mealOptions.indexOf(meal);
        mealRefs.current[index].checked = true;
      });
    }
  }, [modal]);

  return (
    <LightBoxWrapper>
      <FilterHeader>
        <FilterText>Filter</FilterText>
        <Close style={{ cursor: "pointer" }} onClick={() => setModal(0)} />
      </FilterHeader>
      <LightBox>
        {/* <Hr /> */}

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
                  onChange={(event) => setMinimumPrice(event.target.value)}
                  value={minimumPrice}
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
                  onChange={(event) => setMaximumPrice(event.target.value)}
                  value={maximumPrice}
                />
              </PriceInput>
            </PriceContainer>
          </Price>
        </FilterContainer>

        <Hr />

        {/* Amenity Component */}
        <FilterContainer>
          <FilterHeading>Amenities</FilterHeading>
          <CheckBoxWrapper>
            {amenitiesOptions.map((amenity) => (
              <CheckBoxContainer key={amenity}>
                <CheckBox
                  type="checkbox"
                  value={amenity}
                  onClick={handleCheckAmenity}
                  ref={addToAmenities}
                />
                <Text>{amenity}</Text>
              </CheckBoxContainer>
            ))}
          </CheckBoxWrapper>
        </FilterContainer>

        <Hr />

        {/* Meal Included Component */}
        <FilterContainer>
          <FilterHeading>Meals Included</FilterHeading>
          <CheckBoxWrapper>
            {mealOptions.map((meal) => (
              <CheckBoxContainer key={meal}>
                <CheckBox
                  type="checkbox"
                  value={meal}
                  onClick={handleCheckMeal}
                  ref={addToMeals}
                />
                <Text>{meal}</Text>
              </CheckBoxContainer>
            ))}
          </CheckBoxWrapper>
        </FilterContainer>

        <Hr />

        {/* Rating Component */}
        <FilterContainer>
          <FilterHeading>Rating </FilterHeading>

          <SelectContainer type={"rating"}>
            <SelectButton room={hotelRating} onClick={() => setHotelRating(0)}>
              Any
            </SelectButton>
            <SelectButton
              rating={hotelRating}
              onClick={() => setHotelRating(1)}>
              1
            </SelectButton>
            <SelectButton
              rating={hotelRating}
              onClick={() => setHotelRating(2)}>
              2
            </SelectButton>
            <SelectButton
              rating={hotelRating}
              onClick={() => setHotelRating(3)}>
              3
            </SelectButton>
            <SelectButton
              rating={hotelRating}
              onClick={() => setHotelRating(4)}>
              4
            </SelectButton>
            <SelectButton
              rating={hotelRating}
              onClick={() => setHotelRating(5)}>
              5
            </SelectButton>
          </SelectContainer>
        </FilterContainer>
      </LightBox>

      <ButtonContainer>
        <Button onClick={handleClear}>Clear Filter</Button>
        <Button onClick={handleFilter}>Apply Filter</Button>
      </ButtonContainer>
    </LightBoxWrapper>
  );
};

export default FilterProperties;
