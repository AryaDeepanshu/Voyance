import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    wishlisthandler: (state, action) => {
      const accomodation = state.wishlist.filter(
        (acc) => acc._id === action.payload._id
      );

      state.wishlist =
        accomodation.length === 0
          ? [...state.wishlist, action.payload]
          : state.wishlist.filter((wish) => wish._id !== action.payload._id);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

export const { wishlisthandler, clearWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
