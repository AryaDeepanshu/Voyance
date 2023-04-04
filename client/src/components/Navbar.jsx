import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileDashboard from "./ProfileDashboard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector } from "react-redux";
import { useState } from "react";
import SignIn from "./SignIn";

import Modal from "./Modal";
import SignUp from "./SignUp";
const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

const LogoContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LogoImgContainer = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  width: 4rem;
  padding-left: 20px;
  padding-right: 5px;
  max-width: max-content;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const LogoHeading = styled.h2`
  color: black;
  border-left: 1px solid white;
  padding-left: 5px;
  cursor: pointer;
  font-family: "Bree Serif", serif;
`;

const ProfileContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.div`
  width: max-content;
  height: max-content;
  padding: 15px 20px;
  background-color: #ff4b2b;
  color: white;
  margin: 10px;
  font-size: 14px;
  font-family: "Noto Serif", serif;
  cursor: pointer;
  border-radius: 10px;
`;

function Navbar() {
  const { width } = useWindowDimensions();
  const { currentUser: user } = useSelector((store) => store.user);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      {showLoginModal && (
        <Modal>
          <SignIn
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal>
          <SignUp
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      <>
        {/* Logo */}
        <Container>
          {width > 480 ? (
            <LogoContainer>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <LogoImgContainer>
                  <Img
                    alt="voyance"
                    src="https://res.cloudinary.com/additya/image/upload/v1678127598/Voyance/r9udien7vaenzecl8mmk.png"
                  />
                </LogoImgContainer>
              </Link>

              {width > 660 ? (
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <LogoHeading> Voyance </LogoHeading>
                </Link>
              ) : (
                <></>
              )}
            </LogoContainer>
          ) : (
            <></>
          )}

          {/* Profile */}
          {user ? (
            <ProfileContainer>
              <ProfileDashboard />
            </ProfileContainer>
          ) : (
            <Button onClick={() => setShowRegisterModal(true)}>sign-up</Button>
          )}
        </Container>
      </>
    </>
  );
}

export default Navbar;
