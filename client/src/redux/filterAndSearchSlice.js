import { createSlice } from "@reduxjs/toolkit";

const filterAndSearchSlice = createSlice({
  name: "search",
  initialState: {
    beginDate: null,
    endDate: null,
    stay: 1,
    location: "",
    guest: null,
    minPrice: 1000,
    maxPrice: 25000,
    essentials: [],
    mealIncluded: [],
    rating: 0,
  },
  reducers: {
    search: (state, action) => {
      state.beginDate = action.payload.beginDate
        ? action.payload.beginDate
        : state.beginDate;
      state.endDate = action.payload.endDate
        ? action.payload.endDate
        : state.endDate;
      state.location = action.payload.location
        ? action.payload.location
        : state.location;
      state.guest = action.payload.guest ? action.payload.guest : null;
      state.minPrice = action.payload.minPrice ? action.payload.minPrice : 1000;
      state.maxPrice = action.payload.maxPrice
        ? action.payload.maxPrice
        : 25000;
      state.essentials = action.payload.essentials
        ? action.payload.essentials
        : [];
      state.mealIncluded = action.payload.mealIncluded
        ? action.payload.mealIncluded
        : [];
      state.rating = action.payload.rating ? action.payload.rating : 0;
      state.stay = action.payload.stay ? action.payload.stay : 0;
    },
    clear: (state) => {
      state.beginDate = null;
      state.endDate = null;
      state.location = "";
      state.guest = null;
      state.minPrice = 1000;
      state.maxPrice = 25000;
      state.essentials = [];
      state.mealIncluded = [];
      state.rating = 0;
    },
    clearFilters: (state) => {
      state.minPrice = 1000;
      state.maxPrice = 25000;
      state.essentials = [];
      state.mealIncluded = [];
      state.rating = 0;
    },
  },
});

export const { search, clear, clearFilters } = filterAndSearchSlice.actions;
export default filterAndSearchSlice.reducer;
