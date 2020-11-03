const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const dbService = admin.firestore();

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
