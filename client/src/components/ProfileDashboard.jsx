import React from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { logout } from "../redux/userSlice";
import { clearWishlist } from "../redux/wishlistSlice";
import default_avatar from "../static/default_avatar.png";

/* Material - UI imports: */
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Container = styled.div``;

const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
`;

const Option = styled.p`
  padding: 10px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  :hover {
    background-color: lightgray;
  }
`;

const ProfileDashboard = ({ setShowLoginModal, setShowRegisterModal }) => {
  const user = useSelector((store) => store.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist } = useSelector((store) => store.wishlist);

  const mutation = useMutation({
    mutationFn: (wishlist) => {
      return axios.post(
        `http://localhost:5000/user/saveWishlist`,
        { wishlist: wishlist },
        {
          withCredentials: true,
        }
      );
    },
  });

  const handleLogout = () => {
    /* Save the wishlist from redux-store to the mongodb: */
    mutation.mutate(wishlist);
    dispatch(clearWishlist());
    dispatch(logout());
    navigate("/");
  };

  /* Material-UI defined state and Functions: */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user && <Option onClick={handleLogout}>Logout</Option>}

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{ width: 40, height: 40 }}>
              <ProfileImage
                src={
                  user
                    ? user.avatar === "default_avatar"
                      ? default_avatar
                      : user.avatar
                    : default_avatar
                }
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {user ? (
          <Container>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/profile">
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/order`}>
              <MenuItem onClick={handleClose}>Your Orders</MenuItem>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wishlist`}>
              <MenuItem onClick={handleClose}>Your Wishlist</MenuItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleClose}>Become Host</MenuItem>
            </Link>
          </Container>
        ) : (
          <Container>
            <MenuItem onClick={() => setShowLoginModal(true)}>Login</MenuItem>
            <MenuItem onClick={() => setShowRegisterModal(true)}>
              Register
            </MenuItem>
          </Container>
        )}
      </Menu>
    </>
  );
};

export default ProfileDashboard;
