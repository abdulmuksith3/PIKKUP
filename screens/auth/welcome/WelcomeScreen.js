import React from 'react';
import { View, Text} from 'react-native';
import { styles } from './Styles';

export default function WelcomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text onPress={()=>navigation.navigate("LoginScreen")} >WELCOME_SCREEN</Text>
    </View>
  );
}
