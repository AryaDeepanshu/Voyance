import React, { useState } from "react";
import styled from "styled-components";

// Redux Imports:
import { useDispatch } from "react-redux";
import {
  auth_Register,
  auth_Google_Verification,
} from "../redux/authentication";

// Google OAuth Import:
import { useGoogleLogin } from "@react-oauth/google";

// Material-UI Imports:
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

// Responsive.js:
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  flex-direction: row-reverse;

  ${tablet({
    margin: "20%",
    flexDirection: "column-reverse",
  })}

  ${mobile({
    margin: "10%",
    flexDirection: "column-reverse",
  })}
`;

// Left Card and Its Components:
const LeftCard = styled.div`
  height: 27rem;
  width: 44rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 250px;

  ${tablet({
    marginBottom: "15px",
  })}

  ${mobile({
    marginBottom: "10px",
  })}
`;

const LeftHeading = styled.h1`
  margin-top: 25px;
  font-weight: 800;
  font-family: "Montserrat", sans-serif;
`;

const LeftSignInIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0px;
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
  margin-bottom: 15px;
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
  margin-bottom: 10px;
  font-family: "Montserrat", sans-serif;
`;

// Right Card and Its Components:
const RightCard = styled.div`
  height: 27rem;
  width: 44rem;
  flex: 1;
  width: 100%;
  min-height: max-content;
  color: #ffffff;
  background: rgb(255, 142, 110);
  background: linear-gradient(
    135deg,
    rgba(255, 142, 110, 1) 29%,
    rgba(255, 67, 67, 1) 92%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-width: 250px;

  ${tablet({
    padding: "15px 0px",
  })}

  ${mobile({
    padding: "10px 0px",
  })}
`;

const RightHeading = styled.h1`
  font-family: "Montserrat", sans-serif;
`;

const Paragraph = styled.p`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  padding: 20px;
`;

const SignUp = () => {
  const { width } = useWindowDimensions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Google Authentication:
  const auth_Google = useGoogleLogin({
    onSuccess: (token) => {
      dispatch(
        auth_Google_Verification(navigate, dispatch, {
          access_token: token.access_token,
        })
      );
    },
  });

  const auth = (event) => {
    event.preventDefault();
    auth_Register(navigate, dispatch, { name, email, password });
  };

  return (
    <Container>
      <Wrapper>
        <LeftCard>
          <LeftHeading>Sign up</LeftHeading>
          <LeftSignInIconContainer>
            <LeftSignInIcon>
              <FacebookOutlinedIcon />
            </LeftSignInIcon>
            <LeftSignInIcon>
              <GoogleIcon onClick={auth_Google} />
            </LeftSignInIcon>
            <LeftSignInIcon>
              <GitHubIcon />
            </LeftSignInIcon>
          </LeftSignInIconContainer>
          <AlternativeText>or use your email for registration</AlternativeText>

          <Form>
            <Input
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button styled="filled" onClick={auth}>
              SIGN UP
            </Button>
          </Form>
        </LeftCard>
        {width > 480 ? (
          <RightCard>
            <RightHeading>Welcome Back!</RightHeading>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <Link to="/sign-in">
              <Button>SIGN IN</Button>
            </Link>
          </RightCard>
        ) : (
          <></>
        )}
      </Wrapper>
    </Container>
  );
};

export default SignUp;
