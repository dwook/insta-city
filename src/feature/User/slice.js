import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userInfo: null,
  logInWithEmailLoading: false,
  logInWithEmailDone: false,
  logInWithEmailError: null,
  signUpWithEmailLoading: false,
  signUpWithEmailDone: false,
  signUpWithEmailError: null,
};

const reducers = {
  logInWithEmailRequest: (state) => {
    state.logInLoading = true;
    state.logInDone = false;
    state.logInError = null;
  },
  logInWithEmailSuccess: (state, { payload: { user } }) => {
    state.logInLoading = false;
    state.logInDone = true;
    state.userInfo = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    };
  },
  logInWithEmailFailure: (state, { payload: error }) => {
    state.logInLoading = false;
    state.logInError = error.message;
  },
  signUpWithEmailRequest: (state) => {
    state.signUpLoading = true;
    state.signUpDone = false;
    state.signUpError = null;
  },
  signUpWithEmailSuccess: (state, { payload: { user } }) => {
    state.signUpLoading = false;
    state.signUpDone = true;
    state.userInfo = user;
  },
  signUpWithEmailFailure: (state, { payload: error }) => {
    state.signUpLoading = false;
    state.signUpError = error.message;
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
