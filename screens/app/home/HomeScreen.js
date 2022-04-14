import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './Styles'
import firebase from "firebase";


export default function HomeScreen({navigation}) {
  
  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Text onPress={()=>firebase.auth().signOut()}>
        Home Screen
      </Text>
    </View>
  );
}

