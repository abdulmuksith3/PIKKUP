import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { color } from '../theme/color';
import { font } from '../theme/font';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
export default function ButtonSecondary(props) {
  const {title, onPress, size, customStyle, backIcon} = props;

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
      {title && 
        <Text style={styles.text}>
          {title}
        </Text>
      }
      {backIcon && 
        <Icon
          name={'chevron-left'}
          size={26}
          color={color.BLACK_PRIMARY}
          type={"feather"}
        />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSmall: {
    backgroundColor: color.BLUE_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: 50,
    borderRadius: 5,
    shadowColor: color.GRAY_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonMedium: {
    backgroundColor: color.BLUE_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "50%",
    borderRadius: 5,
    shadowColor: color.GRAY_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonLarge: {
    backgroundColor: color.BLUE_SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width: "100%",
    borderRadius:5,
    shadowColor: color.GRAY_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text:{
    color: color.BLACK_PRIMARY,
    fontFamily: font.MEDIUM,
    fontSize: 12
  }
});
