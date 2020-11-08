import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchPlaceLoading: false,
  searchPlaceDone: false,
  searchPlaceError: null,
  searchedPlaces: [],
  selectedPlace: null,
};

const reducers = {
  searchPlaceRequest: (state) => {
    state.searchPlaceLoading = true;
    state.searchPlaceDone = false;
    state.searchPlaceError = null;
  },
  searchPlaceSuccess: (
    state,
    {
      payload: {
        data: { documents },
      },
    }
  ) => {
    state.searchPlaceLoading = false;
    state.searchPlaceDone = true;
    state.searchedPlaces = documents;
  },
  searchPlaceFailure: (state, { payload: error }) => {
    state.searchPlaceLoading = false;
    state.searchPlaceError = error.message;
  },
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers,
});

export const placeReducer = placeSlice.reducer;
export const placeAction = placeSlice.actions;
