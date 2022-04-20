import firebase from "firebase";
import "firebase/auth";
import db from "../../db";
import { logMessage } from "./Log";

export const updateLocation = (location) => {
    try {
      db.ref(`users/${firebase.auth().currentUser.uid}/lastLocation`).update(location);
    } 
    catch (err) {
      logMessage({
          title: 'updateLocation Error',
          body: err.message,
      })
    }
}

export const logout = () => {
  firebase.auth().signOut()
}