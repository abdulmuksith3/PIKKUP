import { showErrorMessage } from './FlashMessage';
import { USER } from '../constants/Authentication';
import { logMessage } from './Log';
import firebase from "firebase";
import db from '../../db';

export const getUser = async () => {
  const snapshot = await db.ref(`users/${firebase.auth().currentUser.uid}`).once('value')
  if(snapshot.val()){
    return snapshot.val()
  } else {
    return null;
  }
};

export const logout = () => {
  firebase.auth().signOut()
}