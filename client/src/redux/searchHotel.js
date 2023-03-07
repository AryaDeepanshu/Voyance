import axios from "axios";
import { searchStart, searchSuccess, searchFailure } from "./SearchSlice";

export const searchHotel = async (dispatch, data) => {
  // console.log(data);
  dispatch(searchStart(data));
  try {
    // const res = await axios.post("", user);
    dispatch(searchSuccess([]));
  } catch (err) {
    dispatch(searchFailure());
  }
};
