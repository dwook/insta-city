import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchAddressLoading: false,
  searchAddressDone: false,
  searchAddressError: null,
  searchedAddresses: [],
  selectedAddress: null,
  searchAccountLoading: false,
  searchAccountDone: false,
  searchAccountError: null,
  searchedAccounts: [],
  createPlaceLoading: false,
  createPlaceDone: false,
  createPlaceError: null,
  createdPlace: null,
  getAccountInfoLoading: false,
  getAccountInfoDone: false,
  getAccountInfoError: null,
  accountInfo: null,
  getAccountMediaLoading: false,
  getAccountMediaDone: false,
  getAccountMediaError: null,
  accountMedia: null,
  getRecentPlacesLoading: false,
  getRecentPlacesDone: false,
  getRecentPlacesError: null,
  recentPlaces: [],
  getPlacesByPointLoading: false,
  getPlacesByPointDone: false,
  getPlacesByPointError: null,
  placesByPoint: [],
  geoPoint: { lat: 37.551279740966, lng: 126.988217046052 },
};

const reducers = {
  searchAddressRequest: (state) => {
    state.searchAddressLoading = true;
    state.searchAddressDone = false;
    state.searchAddressError = null;
  },
  searchAddressSuccess: (
    state,
    {
      payload: {
        data: { documents },
      },
    }
  ) => {
    state.searchAddressLoading = false;
    state.searchAddressDone = true;
    state.searchedAddresses = documents;
  },
  searchAddressFailure: (state, { payload: error }) => {
    state.searchAddressLoading = false;
    state.searchAddressError = error.message;
  },
  searchAccountRequest: (state) => {
    state.searchAccountLoading = true;
    state.searchAccountDone = false;
    state.searchAccountError = null;
  },
  searchAccountSuccess: (
    state,
    {
      payload: {
        data: { users },
      },
    }
  ) => {
    const accountList = users.map((user) => ({
      id: user.user.pk,
      username: user.user.username,
      pic_url: user.user.profile_pic_url,
      fullname: user.user.full_name,
    }));
    state.searchAccountLoading = false;
    state.searchAccountDone = true;
    state.searchedAccounts = accountList;
  },
  searchAccountFailure: (state, { payload: error }) => {
    state.searchAccountLoading = false;
    state.searchAccountError = error.message;
  },
  createPlaceRequest: (state) => {
    state.createPlaceLoading = true;
    state.createPlaceDone = false;
    state.createPlaceError = null;
    state.createdPlace = null;
  },
  createPlaceSuccess: (state, { payload }) => {
    state.createPlaceLoading = false;
    state.createPlaceDone = true;
    console.log("새로운 장소생성", payload);
    state.createdPlace = payload;
  },
  createPlaceFailure: (state, { payload: error }) => {
    state.createPlaceLoading = false;
    state.createPlaceError = error.message;
  },
  getAccountInfoRequest: (state) => {
    state.getAccountInfoLoading = true;
    state.getAccountInfoDone = false;
    state.getAccountInfoError = null;
  },
  getAccountInfoSuccess: (state, { payload: { data } }) => {
    state.getAccountInfoLoading = false;
    state.getAccountInfoDone = true;
    state.accountInfo = {
      followed: data.graphql.user.edge_followed_by.count,
      follow: data.graphql.user.edge_follow.count,
      bio: data.graphql.user.biography,
      link: data.graphql.user.external_url,
      email: data.graphql.user.business_email,
      business_category: data.graphql.user.business_category_name,
      category: data.graphql.user.category_enum,
      media_count: data.graphql.user.edge_owner_to_timeline_media.count,
      media: data.graphql.user.edge_owner_to_timeline_media.edges,
      video: data.graphql.user.edge_felix_video_timeline.edges,
    };
  },
  getAccountMediaRequest: (state) => {
    state.getAccountMediaLoading = true;
    state.getAccountMediaDone = false;
    state.getAccountMediaError = null;
  },
  getAccountMediaSuccess: (state, { payload: { data } }) => {
    state.getAccountMediaLoading = false;
    state.getAccountMediaDone = true;
    state.accountMedia = {
      media_count: data.graphql.user.edge_owner_to_timeline_media.count,
      media: data.graphql.user.edge_owner_to_timeline_media.edges,
      video: data.graphql.user.edge_felix_video_timeline.edges,
    };
  },
  getAccountMediaFailure: (state, { payload: error }) => {
    state.getAccountMediaLoading = false;
    state.getAccountMediaError = error.message;
  },
  getRecentPlacesRequest: (state) => {
    state.getRecentPlacesLoading = true;
    state.getRecentPlacesDone = false;
    state.getRecentPlacesError = null;
    state.recentPlaces = [];
  },
  getRecentPlacesSuccess: (state, { payload }) => {
    state.getRecentPlacesLoading = false;
    state.getRecentPlacesDone = true;
    let places = [];
    payload.forEach((doc) => {
      places.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    state.recentPlaces = places;
  },
  getRecentPlacesFailure: (state, { payload: error }) => {
    state.getRecentPlacesLoading = false;
    state.getRecentPlacesError = error.message;
  },
  getPlacesByPointRequest: (state) => {
    state.getPlacesByPointLoading = true;
    state.getPlacesByPointDone = false;
    state.getPlacesByPointError = null;
    state.createdPlace = null;
  },
  getPlacesByPointSuccess: (state, { payload }) => {
    state.getPlacesByPointLoading = false;
    state.getPlacesByPointDone = true;
    let places = [];
    payload.forEach((doc) => {
      places.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    state.placesByPoint = places;
  },
  getPlacesByPointFailure: (state, { payload: error }) => {
    state.getPlacesByPointLoading = false;
    state.getPlacesByPointError = error.message;
  },
  setGeoPoint: (state, { lat, lng }) => {
    state.geoPoint = { lat, lng };
  },
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers,
});

export const placeReducer = placeSlice.reducer;
export const placeAction = placeSlice.actions;
