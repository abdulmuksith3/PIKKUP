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

export const getUser = async (id) => {
  try {
    const snapshot = await db.ref(`users/${id}`).once('value')
    if(snapshot.val()){
      return snapshot.val()
    } else{
      return null;
    }
  } 
  catch (error) {
    logMessage({
        title: 'getUser Error',
        body: error.message,
    })
    return null;
}
}