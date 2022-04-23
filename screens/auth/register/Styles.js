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
    flex:3,
    justifyContent:"flex-end",
    // backgroundColor:"red",
    width:"85%"
  }
  ,
  containerBottom:{
    flex:1,
    justifyContent:"center"
  },
  titleText:{
    fontFamily: font.SEMI_BOLD,
    fontSize: 40,
    color: color.BLACK_PRIMARY
  },
  carImage:{
    // backgroundColor:"red",
  },
  inputContainer:{
    backgroundColor: color.WHITE_PRIMARY,
    borderColor: "transparent",
    borderRadius:15,
    height: 65,
    justifyContent:"center",
    marginTop:"5%",
    shadowColor: color.GRAY_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  input:{
    marginLeft:20
  },
  hyperlinkText:{
    fontFamily: font.REGULAR,
    fontSize: 16,
    color: color.BLUE_PRIMARY,
    textAlign:"center"
  },
});