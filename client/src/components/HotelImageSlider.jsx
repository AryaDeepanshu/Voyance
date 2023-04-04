import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1% 0px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const LeftDiv = styled.div`
  flex: 1;
  width: 100%;
  aspect-ratio: 4/3;
`;

const RightDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  aspect-ratio: 4/3;
`;

const ImgContainer = styled.div`
  margin-bottom: 10px;
  margin-left: ${(props) => (props.type === "thumbnail" ? "0px" : "2%")};
  width: ${(props) => (props.type === "thumbnail" ? "100%" : "48%")};
  display: flex;
  align-items: center;
  aspect-ratio: 4/3;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
`;

const HotelImageSlider = ({
  thumbnail,
  displayImages,
  setIndex,
  toggleLightBox,
}) => {
  const handleClick = (event) => {
    toggleLightBox(true);
    setIndex(event.target.alt);
  };

  // width of the window:
  const { width } = useWindowDimensions();

  return (
    <Container>
      <Wrapper>
        <LeftDiv>
          <ImgContainer type="thumbnail">
            <Img src={thumbnail} alt="0" onClick={handleClick} />
          </ImgContainer>
        </LeftDiv>
        {width > 660 ? (
          <RightDiv>
            {displayImages.map((img, index) => (
              <ImgContainer key={index}>
                <Img src={img} alt={index + 1} onClick={handleClick} />
              </ImgContainer>
            ))}
          </RightDiv>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
};

export default HotelImageSlider;
