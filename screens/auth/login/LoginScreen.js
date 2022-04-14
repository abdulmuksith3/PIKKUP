import React, {useEffect} from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { styles } from './Styles';
import useOnKeyboard from '../../../common/hooks/useOnKeyboard';
import { useIsFocused } from '@react-navigation/native';

export default function LoginScreen({navigation}) {
  const keyboardVisible = useOnKeyboard();
  const isFocused = useIsFocused();

  useEffect(() => {
    
  }, [isFocused]);

  
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"} style={styles.container}>
        <Text onPress={()=>navigation.navigate("WelcomeScreen")} >Login Screen</Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
