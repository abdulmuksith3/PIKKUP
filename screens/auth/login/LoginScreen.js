import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import { styles } from './Styles';
import useOnKeyboard from '../../../common/hooks/useOnKeyboard';
import { useIsFocused } from '@react-navigation/native';
import { showErrorMessage, showSuccessMessage } from '../../../common/functions/FlashMessage';
import {Input, Icon} from 'react-native-elements';
import { color } from '../../../common/theme/color';
import firebase from "firebase";
import "firebase/auth";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const keyboardVisible = useOnKeyboard();
  const isFocused = useIsFocused();

  const login = () => {
    if (email.length === 0 || password.length === 0) {
      showErrorMessage("Email and Password cannot be empty");
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        showSuccessMessage("Successful Login")
      })
      .catch((error) => {
          if (error.code === "auth/user-not-found") {
            showErrorMessage("User does not exist")
            return false;
          }
          if (error.code === "auth/wrong-password") {
            showErrorMessage(`Email or Password wrong`)
            return false;
          }
          if (error.code === "auth/invalid-email") {
            showErrorMessage(`The email address is invalid!`)
            return false;
          }
      });
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"} style={styles.container}>
        <Text onPress={()=>navigation.navigate("RegisterScreen")} >Login Screen</Text>
        <Input 
          placeholder={'Email Address'}
          onChangeText={(x)=> setEmail(x)}
          value={email}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          // errorStyle={}
          
        />
        <Input 
          placeholder={"*********" }
          secureTextEntry={!passwordVisible}
          onChangeText={(x)=> setPassword(x)}
          value={password}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          rightIcon={
            <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
              <Icon
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={18}
                color={color.GRAY_PRIMARY}
                type={"feather"}
              />
            </TouchableOpacity>                  
          }
        />
        {!keyboardVisible && 
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={()=> login()} style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        }
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
