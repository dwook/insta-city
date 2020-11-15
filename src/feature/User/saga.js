import { call, put, takeLatest } from "redux-saga/effects";
import { userAction } from "./slice";
import { authService } from "../../lib/firebaseCofig";

function signUpAPI({ email, password }) {
  console.log("회원가입", email, password);
  return authService.createUserWithEmailAndPassword(email, password);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);
    console.log("액션", result);
    yield put(userAction.signUpWithEmailSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(userAction.signUpWithEmailFailure(error));
  }
}

export function* watchSignUpWithEmail() {
  yield takeLatest(userAction.signUpWithEmailRequest, signUp);
}

function logInAPI({ email, password }) {
  console.log("로그인", email, password);
  return authService.signInWithEmailAndPassword(email, password);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    console.log(result);
    yield put(userAction.logInWithEmailSuccess(result));
  } catch (error) {
    yield put(userAction.logInWithEmailFailure(error));
  }
}

export function* watchLogInWithEmail() {
  yield takeLatest(userAction.logInWithEmailRequest, logIn);
}
