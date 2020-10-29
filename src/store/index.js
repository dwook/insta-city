import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { userReducer } from "../feature/User/slice";
import {
  watchLogInWithEmail,
  watchSignUpWithEmail,
} from "../feature/User/saga";

const rootReducer = {
  user: userReducer,
};

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([watchLogInWithEmail(), watchSignUpWithEmail()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
