import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text, TouchableOpacity, View, Image} from 'react-native';
import { styles } from './Styles';
import useOnKeyboard from '../../../common/hooks/useOnKeyboard';
import { showErrorMessage, showSuccessMessage } from '../../../common/functions/FlashMessage';
import {Input, Icon} from 'react-native-elements';
import { color } from '../../../common/theme/color';
import firebase from "firebase";
import "firebase/auth";
import db from '../../../db'
import ButtonNext from '../../../common/components/ButtonNext';
import Car from '../../../assets/images/car.png'

const GENDERS = ['Male', 'Female']

export default function LoginScreen({navigation}) {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState(GENDERS[0])
  const keyboardVisible = useOnKeyboard();

  const validate = () => {
    if(fullname.length === 0){
      showErrorMessage("Name cannot be empty")
      return false;
    }
    if (email.length === 0 || password.length === 0) {
      showErrorMessage("Email and Password cannot be empty")
      return false;
    }
    if (!new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$").test(password)){
      showErrorMessage("Enter a strong Password")
      return false;
    }
    signUp();
  };

  const signUp = async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        db.ref(`users/${firebase.auth().currentUser.uid}`).set({
          id: firebase.auth().currentUser.uid,
          fullname: fullname,
          email: email,
          phone: phone,
          gender: gender,
          type: 'Rider'
        });
        showSuccessMessage("Successful Sign Up");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          showErrorMessage("That email address is already in use!")
        }
        if (error.code === "auth/invalid-email") {
          showErrorMessage("That email address is invalid!")
        }
      }
  };

  
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"} style={styles.container}>
        <View style={styles.containerTop}>
          <Image source={Car} style={styles.carImage} />
        </View>
        <View style={styles.containerCenter}>
          <Text style={styles.titleText}>Register</Text>
          <Input 
              placeholder={'Full Name'}
              onChangeText={(x)=> setFullname(x)}
              value={fullname}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
            />
          <Input 
              placeholder={'Email Address'}
              onChangeText={(x)=> setEmail(x)}
              value={email}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
            />
            <Input 
              placeholder={"*********" }
              secureTextEntry={!passwordVisible}
              onChangeText={(x)=> setPassword(x)}
              value={password}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              rightIcon={
                <TouchableOpacity style={{marginRight: 15}} onPress={()=>setPasswordVisible(!passwordVisible)}>
                  <Icon
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={18}
                    color={color.GRAY_PRIMARY}
                    type={"feather"}
                  />
                </TouchableOpacity>                  
              }
            />
            
           <Text onPress={()=>navigation.navigate("LoginScreen")} style={styles.hyperlinkText}>Already have an account? Login</Text>
        </View>
          {!keyboardVisible && 
            <View style={styles.containerBottom}>
                <ButtonNext 
                  onPress={()=> login()}
                />
            </View>
          }
        
        {/* <Text onPress={()=>navigation.navigate("WelcomeScreen")} >Register Screen</Text>
        <Input 
          placeholder={'Email Address'}
          onChangeText={(x)=> setEmail(x)}
          value={email}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
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
        <Input 
          placeholder={'Full Name'}
          onChangeText={(x)=> setFullname(x)}
          value={fullname}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
        />
        <Input 
          placeholder={'Phone'}
          onChangeText={(x)=> setPhone(x)}
          value={phone}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
        /> */}
        {/* {!keyboardVisible && 
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={()=> validate()} style={styles.loginButton}>
              <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        } */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
