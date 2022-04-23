import React, {useEffect, useState, useContext, useRef} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from './Styles'
import { UserContext } from '../../../App';

import db from '../../../db';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');


export default function ProfileScreen({navigation}) {
  const {state, dispatch} = useContext(UserContext);
  const {user} = state;

  return (
    <View style={styles.container}>
     <Text>ProfileScreen</Text>
    </View>
  );
}



