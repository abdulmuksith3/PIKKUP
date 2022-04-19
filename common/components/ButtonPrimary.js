import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { color } from '../theme/color';
import { font } from '../theme/font';
import { Button } from 'react-native-elements';

export default function ButtonPrimary(props) {
  const {title, onPress, size, customStyle, customTextStyle, disabled} = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}
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
      <Text style={[styles.text, customTextStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSmall: {
    backgroundColor: color.BLUE_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: 150,
    borderRadius: 5,
    shadowColor: color.BLUE_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonMedium: {
    backgroundColor: color.BLUE_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "50%",
    borderRadius: 5,
    shadowColor: color.BLUE_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonLarge: {
    backgroundColor: color.BLUE_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "100%",
    borderRadius: 5,
    shadowColor: color.BLUE_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text:{
    color: color.WHITE_PRIMARY,
    fontFamily: font.SEMI_BOLD,
    fontSize: 16
  }
});
