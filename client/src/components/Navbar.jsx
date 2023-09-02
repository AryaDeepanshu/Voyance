import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProfileDashboard from "./ProfileDashboard";

import Logo_Black from "../static/Logo_Black.png";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  width: 100vw;
  z-index: 10;
  position: fixed;
  transition: background-color 0.2s;
  background-color: ${(props) =>
    props.home ? (props.scrolled >= 80 ? "white" : "transparent") : "white"};
`;

const Container = styled.div`
  display: flex;
  height: 80px;
  width: ${(props) =>
    props.home === "home" ? "calc(100% - 50px)" : "calc(100% - 10%)"};
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
  max-width: max-content;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const LogoHeading = styled.h2`
  padding-left: 10px;
  color: black;
  border-left: 1px solid white;
  cursor: pointer;
  font-family: "Bree Serif", serif;
`;

const ProfileContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Navbar = ({ home }) => {
  const { width } = useWindowDimensions();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  /* Logic to handle Navbar Background and Animation: */
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <Wrapper scrolled={scrollPosition} home={home}>
        <Container home={home}>
          {/* Logo Section: */}
          <LogoContainer>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <LogoImgContainer>
                <Img alt="voyance" src={Logo_Black} />
              </LogoImgContainer>
            </Link>

            {width > 660 && (
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <LogoHeading> Voyance </LogoHeading>
              </Link>
            )}
          </LogoContainer>

          {/* Profile Section: */}
          <ProfileContainer>
            <ProfileDashboard
              setShowLoginModal={setShowLoginModal}
              setShowRegisterModal={setShowRegisterModal}
            />
          </ProfileContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default Navbar;
