// import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import {
  AgricultureOutlined,
  ParkOutlined,
  CottageOutlined,
  PhotoFilterOutlined,
  GiteOutlined,
  WarehouseOutlined,
  BeachAccessOutlined,
  CabinOutlined,
  VillaOutlined,
  DiamondOutlined,
  DirectionsBoatFilledOutlined,
  HouseboatOutlined,
  SportsGolfOutlined,
  SurfingOutlined,
  FoundationOutlined,
  ArrowBackIosNew,
  ArrowForwardIos,
  OtherHousesOutlined,
  ApartmentOutlined,
  CastleOutlined,
} from "@mui/icons-material";
import { useRef, useLayoutEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  overflow: hidden;
  flex: 11; // defined wrt SearchResult --> Filter Component.
`;

const Wrapper = styled.div`
  width: 88%;
  translate: -0px;
  height: max-content;
  display: flex;
  align-items: center;
  gap: 15px;
  transform: translateX(${(props) => -props.translate}px);
  transition: all 1.5s ease;
  &:nth-child(2) {
    padding-left: 10px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: ${(props) => (props.dir === "left" ? "0px" : "")};
  right: ${(props) => (props.dir === "right" ? "0px" : "")};
  width: 5%;
  min-width: max-content;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Button = styled.button`
  height: max-content;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 3px 3px;
  border: none;
  background-color: white;
  z-index: 999;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  cursor: pointer;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const CategoryContainer = styled.div`
  height: max-content;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => (props.selected ? "2px solid black" : "")};
`;

const CategoryIcon = styled.div`
  padding: 12px;
  color: ${(props) => (props.selected ? "black" : "")};
`;

const CategoryHeading = styled.div`
  width: max-content;
  font-size: 14px;
  padding: 0px 3px 3px 3px;
  color: ${(props) => (props.selected ? "black" : "gray")};
  font-weight: ${(props) => (props.selected ? "bold" : "")};
  cursor: pointer;
`;

const CategorySlider = ({ category, setCategory }) => {
  const menuItems = [
    {
      label: "National parks",
      icon: <ParkOutlined style={{ transform: "scale(1.5)", color: "gray" }} />,
    },
    {
      label: "Cottage",
      icon: (
        <CottageOutlined style={{ transform: "scale(1.3)", color: "gray" }} />
      ),
    },
    {
      label: "Amazing views",
      icon: (
        <PhotoFilterOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Tiny houses",
      icon: <GiteOutlined style={{ transform: "scale(1.5)", color: "gray" }} />,
    },
    {
      label: "Beaches",
      icon: (
        <BeachAccessOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Houseboats",
      icon: (
        <HouseboatOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Cabin",
      icon: (
        <CabinOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Beach front",
      icon: (
        <VillaOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Iconic cities",
      icon: (
        <DiamondOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Shared Houses",
      icon: (
        <WarehouseOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Golfing",
      icon: (
        <SportsGolfOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Surfing",
      icon: (
        <SurfingOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Boats",
      icon: (
        <DirectionsBoatFilledOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Camping",
      icon: (
        <FoundationOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Farm",
      icon: (
        <AgricultureOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Trulli",
      icon: (
        <OtherHousesOutlined
          style={{ transform: "scale(1.5)", color: "gray" }}
        />
      ),
    },
    {
      label: "Apartment",
      icon: (
        <ApartmentOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
    {
      label: "Raids",
      icon: (
        <CastleOutlined style={{ transform: "scale(1.5)", color: "gray" }} />
      ),
    },
  ];

  // useRef hook;
  const ref = useRef(null);

  // complete screen dimensions:
  const dimensions = useWindowDimensions();

  const [width, setWidth] = useState(500);
  const [translate, setTranslate] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  // using useRef hook to get the width of the component.
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setScrollWidth(ref.current.scrollWidth + 15);
  }, [dimensions]);

  const handleMove = (direction) => {
    if (direction === "right") {
      if (width + translate + 200 <= scrollWidth) {
        setTranslate(translate + 200);
      } else {
        const diff = scrollWidth - (width + translate);
        setTranslate(translate + diff);
      }
    } else {
      if (translate >= 200) {
        setTranslate(translate - 200);
      } else {
        setTranslate(0);
      }
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setCategory(event.target.innerText);
  };

  return (
    <Container>
      <ButtonContainer dir="left">
        <Button onClick={() => handleMove("left")}>
          <ArrowBackIosNew style={{ transform: "scale(0.7)" }} />
        </Button>
      </ButtonContainer>
      <Wrapper ref={ref} translate={translate}>
        {menuItems.map(({ label, icon }) => {
          return (
            <CategoryContainer key={label} selected={label === category}>
              <CategoryIcon selected={label === category}>{icon}</CategoryIcon>
              <CategoryHeading
                selected={label === category}
                onClick={handleClick}>
                {label}
              </CategoryHeading>
            </CategoryContainer>
          );
        })}
      </Wrapper>
      <ButtonContainer dir="right">
        <Button onClick={() => handleMove("right")}>
          <ArrowForwardIos style={{ transform: "scale(0.7)" }} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default CategorySlider;
