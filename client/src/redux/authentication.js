import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from "./userSlice";
import { clearWishlist, setWishlist } from "./wishlistSlice";
import { axiosBaseURL } from "../utils/axiosBaseURL";

/* Email and Password Authentication (Register): */
export const auth_Register = async (
  Navigate,
  dispatch,
  data,
  setShowLoginModal,
  setShowRegisterModal
) => {
  dispatch(loginStart());

  const { name, email, password } = data;
  try {
    const user = await axiosBaseURL.post(
      "auth/register",
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));

    setShowLoginModal(false);
    setShowRegisterModal(false);

    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    console.log(`Register Failure Error: ${Error}`);
  }
};

/* Email and Password Authentication (Login): */
export const auth_Login = async (
  Navigate,
  dispatch,
  data,
  setLoginError,
  setShowLoginModal,
  setShowRegisterModal
) => {
  dispatch(loginStart());

  const { email, password } = data;
  try {
    const user = await axiosBaseURL.post(
      "auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));

    setLoginError(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);

    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    setLoginError(true);
    console.log(`Login Failure Error: ${Error}`);
  }
};

/* Google Authentication (Login & Register) */
export const auth_Google_Verification = async (
  Navigate,
  dispatch,
  data,
  setShowLoginModal,
  setShowRegisterModal
) => {
  dispatch(loginStart());

  try {
    const { access_token } = data;
    const google_info = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const name = google_info.data.name;
    const email = google_info.data.email;
    const password = google_info.data.sub;

    try {
      const user = await axiosBaseURL.post(
        "auth/google",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      setShowLoginModal(false);
      setShowRegisterModal(false);

      dispatch(loginSuccess(user.data));
      dispatch(setWishlist(user.data.wishlist));

      Navigate("");
    } catch (Error) {
      dispatch(loginFailure());
      console.log(`Google Login/Register Failure Error: ${Error}`);
    }
  } catch (Error) {
    dispatch(loginFailure());
    console.log(`Google Login/Register Failure Error: ${Error}`);
  }
};

export const loggingOut = (dispatch, Navigate) => {
  dispatch(clearWishlist());
  dispatch(logout());
};
