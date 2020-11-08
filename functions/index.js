const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const dbService = admin.firestore();
const Axios = require("axios");

exports.createUser = functions.auth.user().onCreate((user) => {
  return dbService.collection("users").doc(user.uid).set({
    placeList: [],
    likeList: [],
    dislkieList: [],
  });
});

exports.deleteUser = functions.auth.user().onDelete((user) => {
  const doc = dbService.collection("users").doc(user.uid);
  return doc.delete();
});

/* 네이버 지역검색 */
exports.searchNaverPlace = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    const result = await Axios.get(
      "https://openapi.naver.com/v1/search/local.json",
      {
        params: { query: data, display: 5 },
        headers: {
          "X-Naver-Client-Id": functions.config().naverplace.id,
          "X-Naver-Client-Secret": functions.config().naverplace.secret,
        },
      }
    );
    return result.data;
  });
