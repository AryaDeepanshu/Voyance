import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from "./userSlice";
import { setWishlist } from "./wishlistSlice";

/* Email and Password Authentication (Register): */
export const auth_Register = async (Navigate, dispatch, data) => {
  console.log(data);
  dispatch(loginStart());

  const { name, email, password } = data;
  try {
    const user = await axios.post(
      "http://localhost:5000/auth/register",
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));
    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    console.log(`Register Failure Error: ${Error}`);
  }
};

/* Email and Password Authentication (Login): */
export const auth_Login = async (Navigate, dispatch, data) => {
  dispatch(loginStart());

  const { email, password } = data;
  try {
    const user = await axios.post(
      "http://localhost:5000/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(loginSuccess(user.data));
    dispatch(setWishlist(user.data.wishlist));

    Navigate("");
  } catch (Error) {
    dispatch(loginFailure());
    console.log(`Login Failure Error: ${Error}`);
  }
};

/* Google Authentication (Login & Register) */
export const auth_Google_Verification = async (Navigate, dispatch, data) => {
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
      const user = await axios.post(
        "http://localhost:5000/auth/google",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(loginSuccess(user.data));
      dispatch(setWishlist(user.data.wishlist));
      Navigate("/");
    } catch (Error) {
      dispatch(loginFailure());
      console.log(`Google Login/Register Failure Error: ${Error}`);
    }
  } catch (Error) {
    dispatch(loginFailure());
    console.log(`Google Login/Register Failure Error: ${Error}`);
  }
};
