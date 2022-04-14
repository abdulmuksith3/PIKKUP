import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyD2GP71yeIPDClNZBvykRkMRHB-7n5Aw9A",
  authDomain: "pikkup-37b0a.firebaseapp.com",
  databaseURL: "https://pikkup-37b0a-default-rtdb.firebaseio.com",
  projectId: "pikkup-37b0a",
  storageBucket: "pikkup-37b0a.appspot.com",
  messagingSenderId: "667407663734",
  appId: "1:667407663734:web:74a5890d8dc75e6382d557",
  measurementId: "G-KQ5V3YT9NC"
};

firebase.initializeApp(config);

export default firebase.database();
