import React from "react";
import styled from "styled-components";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const Container = styled.div`
  height: 27rem;
  width: 44rem;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
`;

// Left Card and Its Components:
const LeftCard = styled.div`
  margin-top: ${(props) => (props.theme === 1 ? "1rem" : "0.4rem")};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${(props) =>
    props.theme === 1 ? "translateX(0rem)" : "translateX(23rem)"};
  transition: all 0.7s ease-out;
  width: 100%;
`;

const LeftHeading = styled.h1`
  font-weight: 800;
  font-family: "Montserrat", sans-serif;
`;

const LeftSignInIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftSignInIcon = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:nth-child(2) {
    margin: 0px 10px;
  }
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  transition: 0.5s linear;
  padding: 8px;
`;

const AlternativeText = styled.p`
  font-size: 14px;
  color: black;
  font-family: "Montserrat", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  border: none;
  padding: 15px;
  background-color: #eee;
  width: 80%;
  border-radius: 4px;
`;

const ForgotPassword = styled.a`
  font-size: 16px;
  color: black;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.styled === "filled" ? "#ff4b2b" : "transparent"};
  border: 1px solid
    ${(props) => (props.styled === "filled" ? "#ff4b2b" : "white")};
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
`;

// Right Card and Its Components:
const RightCard = styled.div`
  flex: 1;
  width: 100%;
  color: #ffffff;
  background: ${(props) =>
    props.theme === 1
      ? "linear-gradient(135deg,rgba(253, 93, 93, 1) 0%,rgba(255, 115, 150, 1) 100%)"
      : "lightblue"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transform: ${(props) =>
    props.theme === 1 ? "translateX(0rem)" : "translateX(-21rem)"};
  transition: all 0.7s ease;
  border-top-right-radius: ${(props) => (props.theme === 1 ? "5px" : "0px")};
  border-bottom-right-radius: ${(props) => (props.theme === 1 ? "5px" : "0px")};
  border-top-left-radius: ${(props) => (props.theme === 1 ? "0px" : "5px")};
  border-bottom-left-radius: ${(props) => (props.theme === 1 ? "0px" : "5px")};
  overflow: hidden;
`;

const RightHeading = styled.h1`
  font-family: "Montserrat", sans-serif;
`;

const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
`;

const SignIn_SignUp = () => {
  const [signIn, setSignIn] = useState(1);

  return (
    <Container>
      <Wrapper>
        <LeftCard theme={signIn}>
          <LeftHeading>{signIn ? "Sign In" : "Sign Up"} </LeftHeading>
          <LeftSignInIconContainer>
            <LeftSignInIcon>
              <FacebookOutlinedIcon />
            </LeftSignInIcon>
            <LeftSignInIcon>
              <GoogleIcon />
            </LeftSignInIcon>
            <LeftSignInIcon>
              <GitHubIcon />
            </LeftSignInIcon>
          </LeftSignInIconContainer>
          <AlternativeText>
            or use your {signIn ? "account" : "email for registration"}
          </AlternativeText>

          <Form>
            {!signIn && <Input placeholder="Name" />}
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            {signIn ? (
              <ForgotPassword href="">Forgot your password?</ForgotPassword>
            ) : (
              ""
            )}
            <Button styled="filled"> {signIn ? "SIGN IN" : "SIGN UP"} </Button>
          </Form>
        </LeftCard>
        <RightCard theme={signIn}>
          <RightHeading>
            {signIn ? "Hello, Friend!" : "Welcome Back!"}
          </RightHeading>
          <Paragraph>
            {signIn
              ? "Enter your personal detials and start journet with us"
              : "To keep connected with us please login with your personal info"}
          </Paragraph>
          <Button onClick={() => setSignIn(signIn ? 0 : 1)}>
            {signIn ? "SIGN UP" : "SIGN IN"}
          </Button>
        </RightCard>
      </Wrapper>
    </Container>
  );
};

export default SignIn_SignUp;
