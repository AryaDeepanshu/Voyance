import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    startDate: null,
    endDate: null,
    stay: 1,
    searchResult: [],
    location: null,
    isFetching: false,
    error: false,
    minPrice: null,
    maxPrice: null,
    room: 0,
    propertyType: 0,
    essentials: [],
    mealIncluded: [],
    rating: 0,
    guest: 0,
  },
  reducers: {
    searchStart: (state, action) => {
      state.isFetching = true;
      state.startDate = action.payload.startDate
        ? action.payload.startDate
        : state.startDate;
      state.endDate = action.payload.endDate
        ? action.payload.endDate
        : state.endDate;
      state.location = action.payload.location
        ? action.payload.location
        : state.location;
      state.minPrice = action.payload.minPrice ? action.payload.minPrice : null;
      state.maxPrice = action.payload.maxPrice ? action.payload.maxPrice : null;
      state.room = action.payload.room ? action.payload.room : 0;
      state.propertyType = action.payload.propertyType
        ? action.payload.propertyType
        : 0;
      state.essentials = action.payload.essentials
        ? action.payload.essentials
        : [];
      state.mealIncluded = action.payload.mealIncluded
        ? action.payload.mealIncluded
        : [];
      state.rating = action.payload.rating ? action.payload.rating : 0;
      state.guest = action.payload.guest ? action.payload.guest : 0;
      state.stay = action.payload.stay ? action.payload.stay : 0;
    },
    searchSuccess: (state, action) => {
      state.isFetching = false;
      state.searchResult = action.payload;
    },
    searchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { searchStart, searchSuccess, searchFailure } =
  searchSlice.actions;
export default searchSlice.reducer;
