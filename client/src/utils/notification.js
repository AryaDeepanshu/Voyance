import toast from "react-hot-toast";

export const LoginSuccess = () => toast("Logged In Successfully.");
export const Required = () => toast("All fields are required.");
export const InvalidCredentials = () => toast("Invalid credentials.");
export const LoginError = () =>
  toast("Something went wrong, Please try Again.");

export const RegisterSuccess = () =>
  toast("Successfully Registerated and Logged In.");
export const RegisterError = () =>
  toast("Something went wrong, Please try Again.");
export const AlreadyExist = () => toast("Email already registered.");
export const InvalidEmail = () => toast("Invalid Email!");

export const Logout = () => toast("Logged out.");

export const AddToWishlist = () => toast("Added to Favourites.");
export const RemoveFromWishlist = () => toast("Removed to Favourites.");

export const OrderPlacedSuccessfully = () =>
  toast("Booking Successful, Enjoy Your Stay :-)");

export const ReviewAdded = () => toast("Review Added.");
export const ReviewUpdated = () => toast("Review updated.");
export const ReviewDeleted = () => toast("Review Deleted.");
export const ReviewError = () =>
  toast("Something went wrong, Please try Again.");

export const ProfileUpdated = () => toast("Profile updated successfully.");
