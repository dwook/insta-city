import Axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { placeAction } from "./slice";

function searchPlaceAPI(query) {
  console.log(query);
  console.log(process.env.REACT_APP_KAKAO_REST_API_KEY);
  const result = Axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: { query },
      headers: {
        Authorization: "KakaoAK " + process.env.REACT_APP_KAKAO_REST_API_KEY,
      },
    }
  );

  return result;
}

function* searchPlace(action) {
  try {
    const result = yield call(searchPlaceAPI, action.payload);
    console.log("액션", result);
    yield put(placeAction.searchPlaceSuccess(result));
  } catch (error) {
    console.log("에러", error);
    yield put(placeAction.searchPlaceFailure(error));
  }
}

export function* watchSearchPlace() {
  yield takeLatest(placeAction.searchPlaceRequest, searchPlace);
}
