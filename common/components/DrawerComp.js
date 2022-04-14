import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { color } from '../theme/color';


export default function DrawerComp(props) {

  return (
    <View {...props} style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BLACK,
  },
});
