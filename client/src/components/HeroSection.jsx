import styled from "styled-components";
import { desktop, largeMobile, mobile, tablet } from "../responsive";

const Container = styled.div`
  position: relative;
  width: 100vw;
  aspect-ratio: 4/2;
  background-image: url(https://images.pexels.com/photos/1009136/pexels-photo-1009136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  background-repeat: no-repeat;
  background-size: cover;

  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "4/3",
  })}

  ${largeMobile({
    aspectRatio: "6/5",
  })}

  ${tablet({
    aspectRatio: "6/5",
  })}
`;

const AboutContainer = styled.div`
  height: max-content;
  justify-content: center;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  top: 25%;
  right: 10%;

  ${mobile({
    bottom: "10px",
    right: "auto",
    width: "70%",
  })}

  ${largeMobile({
    width: "60%",
  })}

  ${tablet({
    top: "25%",
  })}

  ${desktop({
    width: "30%",
    top: "25%",
    right: "10%",
  })};
`;

const About = styled.p`
  color: #4ee2ec;
  font-weight: bold;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;
  ${mobile({
    fontSize: "12px",
  })}
`;

const Heading = styled.h1`
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 10px 0px 20px 0px;

  ${mobile({
    fontSize: "22px",
    padding: "10px 0px 10px 0px",
  })}

  ${largeMobile({
    fontSize: "28px",
  })}
`;

const HeadingDescription = styled.h3`
  color: lightgray;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;

  ${mobile({
    fontSize: "13px",
  })}
`;

const FigureContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px 0px 0px 0px;
`;

const Figure = styled.div``;

const FigureHeading = styled.h1`
  color: #4ee2ec;
  font-family: "Montserrat", sans-serif;

  ${mobile({
    fontSize: "22px",
  })}

  ${largeMobile({
    fontSize: "28px",
  })}
`;

const FigureDescription = styled.h3`
  font-size: 12px;
  color: lightgray;
  font-family: "Montserrat", sans-serif;
`;

function HeroSection() {
  return (
    <Container>
      <AboutContainer>
        <About>ABOUT US</About>
        <Heading>Our tour plan is to fulfil your dream wish</Heading>
        <HeadingDescription>
          Understand to achieve anything requires faith and belief in yourself,
          vision. hard work determination, and dedication.
        </HeadingDescription>
        <FigureContainer>
          <Figure>
            <FigureHeading>15</FigureHeading>
            <FigureDescription>Years of Experience</FigureDescription>
          </Figure>

          <Figure>
            <FigureHeading>1k</FigureHeading>
            <FigureDescription>Successful Trips</FigureDescription>
          </Figure>

          <Figure>
            <FigureHeading>20k</FigureHeading>
            <FigureDescription>Happy Customers</FigureDescription>
          </Figure>

          <Figure>
            <FigureHeading>4.9</FigureHeading>
            <FigureDescription>Overall Rating</FigureDescription>
          </Figure>
        </FigureContainer>
      </AboutContainer>
    </Container>
  );
}

export default HeroSection;
