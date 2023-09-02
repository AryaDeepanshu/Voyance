import styled from "styled-components";
import { mobile, tablet, desktop } from "../utils/responsive";

import {
  MapsHomeWorkOutlined,
  CheckCircleOutlined,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  background-color: #f7f7f7;
`;

const Heading = styled.h1`
  font-family: "Bree Serif", serif;
`;

const ServiceContainer = styled.div`
  display: flex;
  gap: 5%;
  flex-wrap: wrap;
  padding: 20px 60px;

  ${mobile({
    padding: "20px 10px",
  })}

  ${tablet({
    padding: "20px 20px",
  })}

  ${desktop({
    padding: "20px 80px",
  })}
`;

const ServiceComponent = styled.div`
  flex: 1;
  margin: 25px;
  padding: 25px;
  min-width: 150px;
  border-radius: 10px;
  cursor: pointer;

  /* Glass-Morphism */
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h2`
  padding: 15px 0px;
  font-family: "Bree Serif", serif;
`;

const Description = styled.p`
  font-family: "Noto Serif", serif;
`;

function OurServices() {
  return (
    <Container>
      <Heading>Our Services</Heading>
      <ServiceContainer>
        <ServiceComponent>
          <Link to="/" className="link">
            <Wrapper>
              <ConfirmationNumberOutlined
                style={{
                  color: "#38E54D",
                  transform: "scale(1.5)",
                  paddingLeft: "4px",
                }}
              />
              <Title>Ticket Booking</Title>
              <Description>
                We book all kind of national or international ticker for your
                destination.
              </Description>
            </Wrapper>
          </Link>
        </ServiceComponent>

        <ServiceComponent>
          <Link to="/" className="link">
            <Wrapper>
              <MapsHomeWorkOutlined
                style={{
                  color: "#7DE5ED",
                  transform: "scale(1.5)",
                  paddingLeft: "4px",
                }}
              />
              <Title>Hotel Booking</Title>
              <Description>
                You can easily book hotel accoriding to your budget bu our
                website.
              </Description>
            </Wrapper>
          </Link>
        </ServiceComponent>

        <ServiceComponent>
          <Link to="/" className="link">
            <Wrapper>
              <CheckCircleOutlined
                style={{
                  color: "#FF8787",
                  transform: "scale(1.5)",
                  paddingLeft: "4px",
                }}
              />
              <Title>Tour Plan</Title>
              <Description>
                We provide you the best plan within a short time so that you can
                expore more.
              </Description>
            </Wrapper>
          </Link>
        </ServiceComponent>
      </ServiceContainer>
    </Container>
  );
}

export default OurServices;
