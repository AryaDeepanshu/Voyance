import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";
import styled from "styled-components";
import { mobile, largeMobile, desktop } from "../utils/responsive";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
`;

const ImgContainer = styled.div`
  width: 80%;
  aspect-ratio: 4/3;

  ${desktop({
    width: "60%",
  })}
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  position: absolute;
  border: 1px solid white;
  padding: 7px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: ${(props) => (props.type === "forward" ? "2%" : "")};
  left: ${(props) => (props.type === "backward" ? "2%" : "")};

  &:hover {
    background-color: gray;
    transition: all 0.5s;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2%;
  right: 2%;
  border: 1px solid white;
  padding: 7px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LightBox = ({ hotelImages, index, setIndex, toggleLightBox }) => {
  const handleClick = (dir) => {
    if (dir === "left") {
      if (index === 0) setIndex(hotelImages.length - 1);
      else setIndex(Number(index) - 1);
    } else {
      if (index === hotelImages.length - 1) setIndex(0);
      else setIndex(Number(index) + 1);
    }
  };

  return (
    <Container>
      <CloseButton
        style={{ transform: "scale(1.2)", color: "white" }}
        onClick={() => toggleLightBox(false)}>
        <Close />
      </CloseButton>
      <Button
        onClick={handleClick}
        type="backward"
        style={{ transform: "scale(1.2)", color: "white" }}>
        <ArrowBackIosNew />
      </Button>
      <ImgContainer>
        <Img src={hotelImages[index]} />
      </ImgContainer>
      <Button
        onClick={handleClick}
        type="forward"
        style={{ transform: "scale(1.2)", color: "white" }}>
        <ArrowForwardIos />
      </Button>
    </Container>
  );
};

export default LightBox;
