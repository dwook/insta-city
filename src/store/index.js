import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { userReducer } from "../feature/User/slice";
import { placeReducer } from "../feature/Place/slice";
import {
  watchLogInWithEmail,
  watchSignUpWithEmail,
} from "../feature/User/saga";
import {
  watchSearchAddress,
  watchSearchAccount,
  watchCreatePlace,
  watchGetAccountInfo,
  watchGetRecentPlaces,
} from "../feature/Place/saga";

const rootReducer = {
  user: userReducer,
  place: placeReducer,
};

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    watchLogInWithEmail(),
    watchSignUpWithEmail(),
    watchSearchAddress(),
    watchSearchAccount(),
    watchCreatePlace(),
    watchGetAccountInfo(),
    watchGetRecentPlaces(),
  ]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
