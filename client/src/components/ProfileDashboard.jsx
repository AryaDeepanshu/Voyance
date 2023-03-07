import { FavoriteBorder } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  gap: 30px;
  align-items: center;
`;

const BecomeHost = styled.span`
  color: white;
  font-size: 16px;
  padding: 12px 25px;
  border-radius: 24px;
  background-color: teal;
  font-family: "Roboto", sans-serif;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Favorite = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  height: 36px;
  width: 36px;
  position: relative;
`;

const Avatar = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
`;

const OptionWrapper = styled.div`
  /* gap: 10px; */
  right: 0px;
  width: 200px;
  z-index: 999;
  display: flex;
  padding: 15px 0px;
  position: absolute;
  border-radius: 10px;
  flex-direction: column;
  background-color: white;
  border: 1px solid lightgray;
`;

const Option = styled.p`
  padding: 10px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  :hover {
    background-color: lightgray;
  }
`;

const ProfileDashboard = () => {
  const user = useSelector((store) => store.user.currentUser);
  const [option, setOption] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <BecomeHost>Become Host</BecomeHost>

      <DetailWrapper>
        <Favorite>
          <FavoriteBorder style={{ transform: "scale(1.3)", color: "black" }} />
        </Favorite>
        <AvatarWrapper onClick={() => setOption(!option)}>
          <Avatar
            src={
              user
                ? user.avatar
                : "https://pic.onlinewebfonts.com/svg/img_569204.png"
            }
          />

          {option && (
            <OptionWrapper>
              {user ? (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/profile">
                    <Option>Profile</Option>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/wishlist/${user._id}`}>
                    <Option>Wishlist</Option>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/orders/${user._id}`}>
                    <Option>Your orders</Option>
                  </Link>
                  {user.host && (
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/add-hotel`}>
                      <Option>Add Hotel</Option>
                    </Link>
                  )}
                  <Option onClick={handleLogout}>Logout</Option>
                </>
              ) : (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/login/`}>
                    <Option>Login</Option>{" "}
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/register">
                    <Option>Register</Option>{" "}
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/become-host">
                    <Option>Become a host</Option>{" "}
                  </Link>
                </>
              )}
            </OptionWrapper>
          )}
        </AvatarWrapper>
      </DetailWrapper>
    </Container>
  );
};

export default ProfileDashboard;
