import React, {createContext, useReducer, useState, useEffect} from 'react';
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
import AuthContainer from './navigator/AuthContainer';
import AppContainer from './navigator/AppContainer';
import FlashMessage from "react-native-flash-message";
import { AuthReducer, initialState, LOGIN, LOGOUT} from './common/reducers/AuthReducer';
import { MenuProvider } from 'react-native-popup-menu';
import firebase from "firebase";
import "firebase/auth";
import db from './db';
import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
LogBox.ignoreLogs([
  'Require cycle:',
]);
export const UserContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const [user, setUser] = useState(null);
  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    handleUser()
  }, [user]);

  const handleUser = async () => {
    if(user) {
      db.ref(`users/${firebase.auth().currentUser.uid}`).on('value', (snapshot) => {
        if(snapshot.val()){
          dispatch({type:LOGIN, payload: snapshot.val()})
        }
      })
    } else {
      dispatch({type:LOGOUT})
    }
  }

  if(!fontsLoaded){
    return <AppLoading />
  } else {
    return (
        <UserContext.Provider value={{state, dispatch}} >
          {state.user ?
            <MenuProvider>
              <AppContainer />
            </MenuProvider>
            :
            <AuthContainer/>
          }
          <FlashMessage position="top" />
        </UserContext.Provider>
    );
    // }
  }
}