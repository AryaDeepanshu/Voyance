import {
  Facebook,
  Instagram,
  Send,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile, largeMobile, tablet, desktop } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 80px 0px;
  flex-wrap: wrap;
  align-items: flex-start;

  ${mobile({
    gap: "20px",
    padding: "40px 0px",
    flexDirection: "column",
    alignItems: "center",
  })}

  ${largeMobile({
    padding: "25px",
  })}
`;

const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  width: 100%;

  ${largeMobile({
    marginBottom: "25px",
  })}
`;

const AddressContainer = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 142px;
  max-width: 300px;
  padding: 0px 15px;

  ${tablet({
    maxWidth: "250px",
  })}
`;

const HeadingContainer = styled.div`
  display: flex;
`;

const Heading = styled.h2`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
`;

const Address = styled.p`
  color: gray;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;

  ${desktop({
    fontSize: "16px",
  })}
`;

const SocialIconsContainer = styled.div`
  display: flex;
  padding: 0px 15px;
  gap: 10px;
  align-items: flex-start;
`;

const MiddleWrapper = styled.div`
  flex: 2;
  display: flex;
  min-width: 345px;
  max-width: 600px;
  /* ${mobile({
    order: "2",
  })} */

  ${largeMobile({
    order: "2",
    padding: "0px 25px",
  })}

  ${tablet({
    order: "2",
  })}
`;

const LinkWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${largeMobile({
    justifyContent: "flex-start",
  })}
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  justify-content: center;
`;

const SubHeader = styled.h2`
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
`;

const LinkDesc = styled.p`
  cursor: pointer;
  font-size: 13px;
  color: gray;
  font-family: "Montserrat", sans-serif;

  ${desktop({
    fontSize: "14px",
  })}
`;

const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  ${mobile({
    alignItems: "center",
  })}

  ${largeMobile({
    marginBottom: "25px",
  })}

${tablet({
    marginBottom: "25px",
  })}
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 15px;
  min-width: 210px;
  max-width: 250px;
`;

const Title = styled.p`
  color: gray;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;

  ${desktop({
    fontSize: "16px",
  })}
`;

const InputContainer = styled.div`
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 10px;
  width: 90%;
  ${desktop({
    borderRadius: "25px",
    padding: "10px",
  })};
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  ::placeholder {
    color: gray;
  }
`;

// Pending Task : handle the responsiveness of this element below 480px i.e for mobile view and for above 1024px i.e desktop view. --> only if time permits
const Footer = () => {
  return (
    <Container type="hotelInfo">
      <LeftWrapper>
        <AddressContainer>
          <HeadingContainer>
            <Heading>Voyance</Heading>
          </HeadingContainer>
          {/* <Address>4517, Washington Ave, Manchester Kentucky, 39495</Address> */}
          <Address>
            The website ends here, but your journey to the Amazing destinations
            begins with Zostel. Explore with our social hostels, homestays, and
            luxury stays on your next holiday.
          </Address>
          {/* <SocialIconsContainer>
            <Facebook style={{ cursor: "pointer", color: "#4ee2ec" }} />
            <Instagram style={{ cursor: "pointer", color: "#4ee2ec" }} />
            <Twitter style={{ cursor: "pointer", color: "#4ee2ec" }} />
          </SocialIconsContainer> */}
        </AddressContainer>
      </LeftWrapper>

      <MiddleWrapper>
        <LinkWrapper>
          <LinkContainer>
            <SubHeader>About us.</SubHeader>
            <LinkDesc>About</LinkDesc>
            <LinkDesc>Features</LinkDesc>
            <LinkDesc>News</LinkDesc>
            <LinkDesc>Plans</LinkDesc>
          </LinkContainer>
        </LinkWrapper>
        <LinkWrapper>
          <LinkContainer>
            <SubHeader>Company</SubHeader>
            <LinkDesc>Why Voyance</LinkDesc>
            <LinkDesc>Partner with us</LinkDesc>
            <LinkDesc>FAQ</LinkDesc>
            <LinkDesc>Blog</LinkDesc>
          </LinkContainer>
        </LinkWrapper>
        <LinkWrapper>
          <LinkContainer>
            <SubHeader>Support</SubHeader>
            <LinkDesc>Account</LinkDesc>
            <LinkDesc>Support Center</LinkDesc>
            <LinkDesc>Feedback</LinkDesc>
            <LinkDesc>Contact us</LinkDesc>
          </LinkContainer>
        </LinkWrapper>
      </MiddleWrapper>

      <RightWrapper>
        <NewsletterContainer>
          <Heading>Newsletter</Heading>
          <Title>Subscribe our newsletter and get exciting offers.</Title>
          <InputContainer>
            <Input placeholder="Enter your email here." />
            <Send style={{ cursor: "pointer", color: "#4ee2ec" }} />
          </InputContainer>
        </NewsletterContainer>
        <SocialIconsContainer>
          <Facebook style={{ cursor: "pointer", color: "#0008C1" }} />
          <Instagram style={{ cursor: "pointer", color: "#E0144C" }} />
          <Twitter style={{ cursor: "pointer", color: "#2192FF" }} />
          <YouTube style={{ cursor: "pointer", color: "#FF1E1E" }} />
          <WhatsApp style={{ cursor: "pointer", color: "#54B435" }} />
        </SocialIconsContainer>
      </RightWrapper>
    </Container>
  );
};

export default Footer;
