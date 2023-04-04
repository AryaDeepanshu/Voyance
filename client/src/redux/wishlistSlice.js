import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    wishlisthandler: (state, action) => {
      state.wishlist =
        state.wishlist.indexOf(action.payload) === -1
          ? [...state.wishlist, action.payload]
          : state.wishlist.filter((wish) => wish != action.payload);
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
