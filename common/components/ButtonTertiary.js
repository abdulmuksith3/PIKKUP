import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { color } from '../theme/color';
import { font } from '../theme/font';
import { Button } from 'react-native-elements';

export default function ButtonTertiary(props) {
  const {title, onPress, color, customStyle} = props;

  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Text style={[styles.text, {color:color}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  text:{
    fontFamily: font.MEDIUM,
    fontSize: 12
  }
});
