import axios from "axios";
import { call, put, takeLatest, debounce } from "redux-saga/effects";
import { placeAction } from "./slice";
import { dbService, serverTimestamp } from "lib/firebaseCofig";

function searchAddressAPI(query) {
  console.log(query);
  console.log(process.env.REACT_APP_KAKAO_REST_API_KEY);
  const result = axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: { query },
      headers: {
        Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_API_KEY,
      },
    }
  );
  console.log(result);
  return result;
}

function* searchAddress(action) {
  try {
    const result = yield call(searchAddressAPI, action.payload);
    console.log("액션", result);
    yield put(placeAction.searchAddressSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.searchAddressFailure(error));
  }
}

function searchAccountAPI(query) {
  const result = axios.get(
    `https://www.instagram.com/web/search/topsearch/?context=user&query=${query}&count=100`
  );
  console.log(result);
  return result;
}

function* searchAccount(action) {
  try {
    const result = yield call(searchAccountAPI, action.payload);
    console.log("액션", result);
    yield put(placeAction.searchAccountSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.searchAccountFailure(error));
  }
}

function createPlaceAPI({ instagram, instagramInfo, kakao, user }) {
  console.log("API", instagram, instagramInfo, kakao, user);
  const result = dbService.collection("place").add({
    creatorId: user,
    createdAt: serverTimestamp(),
    instagram,
    instagramInfo,
    kakao,
  });
  return result;
}

function* createPlace(action) {
  try {
    const result = yield call(createPlaceAPI, action.payload);
    console.log("액션", result);
    yield put(placeAction.createPlaceSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.createPlaceFailure(error));
  }
}

function getAccountInfoAPI(account) {
  const result = axios.get(`https://www.instagram.com/${account}/?__a=1`);
  return result;
}

function* getAccountInfo(action) {
  try {
    const result = yield call(getAccountInfoAPI, action.payload);
    console.log("인포액션", result);
    yield put(placeAction.getAccountInfoSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.getAccountInfoFailure(error));
  }
}

function getRecentPlacesAPI() {
  const result = dbService.collection("place").onSnapshot((snapshot) => {
    const recentPlaces = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(recentPlaces);
  });
  return result;
}

function* getRecentPlaces(action) {
  try {
    const result = yield call(getRecentPlacesAPI, action.payload);
    console.log("액션", result);
    yield put(placeAction.getRecentPlacesSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.getRecentPlacesFailure(error));
  }
}

export function* watchSearchAddress() {
  yield debounce(100, placeAction.searchAddressRequest, searchAddress);
}

export function* watchSearchAccount() {
  yield debounce(100, placeAction.searchAccountRequest, searchAccount);
}

export function* watchCreatePlace() {
  yield takeLatest(placeAction.createPlaceRequest, createPlace);
}

export function* watchGetAccountInfo() {
  yield takeLatest(placeAction.getAccountInfoRequest, getAccountInfo);
}

export function* watchGetRecentPlaces() {
  yield takeLatest(placeAction.getRecentPlacesRequest, getRecentPlaces);
}
