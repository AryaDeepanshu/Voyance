import { useRef } from "react";
import styled from "styled-components";
import { propertyList } from "../data/propertyList";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const Container = styled.div`
  width: 95%;
  flex: 11;
  height: 80px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: flex-start;
`;

const Wrapper = styled.div`
  gap: 15px;
  width: 100%;
  display: grid;
  overflow-x: auto;
  scrollbar-width: none;
  grid-auto-flow: column;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 5%;
  z-index: 1;
  height: 80px;
  display: flex;
  align-items: center;
  min-width: max-content;
  justify-content: center;
  left: ${(props) => (props.dir === "left" ? "0px" : "")};
  right: ${(props) => (props.dir === "right" ? "0px" : "")};
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
  margin: 4px 0px;
  display: flex;
  width: max-content;
  height: max-content;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
`;

const CategoryIcon = styled.div`
  padding: 12px;
  color: ${(props) => (props.selected ? "black" : "")};
`;

const CategoryHeading = styled.div`
  cursor: pointer;
  font-size: 14px;
  width: max-content;
  padding: 0px 3px 3px 3px;
  font-family: "Bree Serif", serif;
  color: ${(props) => (props.selected ? "black" : "gray")};
  font-weight: ${(props) => (props.selected ? "500" : "400")};
`;

const OptionSlider = ({ category, setCategory }) => {
  /* useRef hook */
  const ref = useRef(null);

  /* Category handler: */
  const handleClick = (event) => {
    event.preventDefault();
    setCategory(event.target.innerText);
  };

  /* Slider Scroll Handler: */
  const handleScroll = (direction) => {
    if (direction === "left") ref.current.scrollLeft -= 200;
    if (direction === "right") ref.current.scrollLeft += 200;
  };

  return (
    <Container>
      {/* Left Button: */}
      <ButtonContainer dir="left">
        <Button onClick={() => handleScroll("left")}>
          <ArrowBackIosNew style={{ transform: "scale(0.7)" }} />
        </Button>
      </ButtonContainer>

      {/* Main Container: */}
      <Wrapper ref={ref}>
        {propertyList.map(({ label, icon }) => (
          <CategoryContainer key={label} selected={label === category}>
            <CategoryIcon selected={label === category}>{icon}</CategoryIcon>
            <CategoryHeading
              selected={label === category}
              onClick={handleClick}>
              {label}
            </CategoryHeading>
          </CategoryContainer>
        ))}
      </Wrapper>

      {/* Right Button: */}
      <ButtonContainer dir="right">
        <Button onClick={() => handleScroll("right")}>
          <ArrowForwardIos style={{ transform: "scale(0.7)" }} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default OptionSlider;
