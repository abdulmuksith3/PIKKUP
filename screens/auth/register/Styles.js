import { StyleSheet, Dimensions } from 'react-native';
import {color} from '../../../common/theme/color'
import {font} from '../../../common/theme/font'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  }
});