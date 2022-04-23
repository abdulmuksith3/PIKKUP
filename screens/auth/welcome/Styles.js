import { StyleSheet, Dimensions } from 'react-native';
import {color} from '../../../common/theme/color'
import {font} from '../../../common/theme/font'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: color.WHITE_SECONDARY
  }
  ,
  containerTop:{
    flex:1,
    justifyContent:"flex-end"
  }
  ,
  containerCenter:{
    flex:1,
    justifyContent:"center"
  }
  ,
  containerBottom:{
    flex:1.5,
  },
  titleText:{
    fontFamily: font.SEMI_BOLD,
    fontSize: 64,
    color: color.BLACK_PRIMARY
  },
  carImage:{
    // backgroundColor:"red",
    
  }
});