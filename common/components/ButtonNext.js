import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { color } from '../theme/color';
import { font } from '../theme/font';
import { Icon } from 'react-native-elements';

export default function ButtonNext(props) {
  const {title, onPress, customStyle} = props;

  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Icon
        size={30}
        type={"feather"}
        name={"chevron-right"}
        color={color.WHITE_PRIMARY}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:color.BLUE_PRIMARY,
    width: 85,
    height:85,
    borderRadius: 100,
    shadowColor: color.BLUE_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
