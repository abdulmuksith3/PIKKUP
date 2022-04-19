import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { color } from '../theme/color';
import { font } from '../theme/font';
import { Button } from 'react-native-elements';

export default function ButtonSecondary(props) {
  const {title, onPress, size, customStyle} = props;

  return (
    <TouchableOpacity onPress={onPress}
      style={
        [
        (size === 'small' ? 
        styles.buttonSmall 
        :
        size === 'medium' ?
        styles.buttonMedium
        :
        styles.buttonLarge)
        ,
        customStyle
      ]
      } 
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSmall: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height:45,
    width: 150,
    borderRadius: 5,
    borderWidth:1,
    borderColor: color.BLUE_PRIMARY,
  },
  buttonMedium: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "50%",
    borderRadius: 5,
    borderWidth:1,
    borderColor: color.BLUE_PRIMARY,
  },
  buttonLarge: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "100%",
    borderRadius: 1,
    borderWidth:1,
    borderColor: color.BLUE_PRIMARY,
    borderRadius:5
  },
  text:{
    color: color.BLUE_PRIMARY,
    fontFamily: font.MEDIUM,
    fontSize: 12
  }
});
