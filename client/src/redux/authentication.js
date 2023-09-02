import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { setWishlist } from "./wishlistSlice";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import {
  InvalidCredentials,
  LoginError,
  LoginSuccess,
  RegisterError,
  RegisterSuccess,
} from "../utils/notification";

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
    const user = await axiosBaseURL.post("auth/register", {
      name,
      email,
      password,
    });

    RegisterSuccess();
    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));

    setShowLoginModal(false);
    setShowRegisterModal(false);
    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    RegisterError();
    console.log(`Register Failure Error: ${Error}`);
  }
};

/* Email and Password Authentication (Login): */
export const auth_Login = async (
  Navigate,
  dispatch,
  data,
  setShowLoginModal,
  setShowRegisterModal
) => {
  dispatch(loginStart());

  const { email, password } = data;
  try {
    const user = await axiosBaseURL.post("auth/login", {
      email,
      password,
    });

    LoginSuccess();
    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));

    setShowLoginModal(false);
    setShowRegisterModal(false);

    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    InvalidCredentials();
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
      const user = await axiosBaseURL.post("auth/google", {
        name,
        email,
        password,
      });

      setShowLoginModal(false);
      setShowRegisterModal(false);

      LoginSuccess();
      dispatch(loginSuccess(user.data));
      dispatch(setWishlist(user.data.wishlist));

      Navigate("");
    } catch (Error) {
      LoginError();
      dispatch(loginFailure());
      console.log(`Google Login/Register Failure Error: ${Error}`);
    }
  } catch (Error) {
    LoginError();
    dispatch(loginFailure());
    console.log(`Google Login/Register Failure Error: ${Error}`);
  }
};
