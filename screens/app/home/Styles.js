import { StyleSheet } from 'react-native';
import { color } from '../../../common/theme/color';
import { font } from '../../../common/theme/font'
export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  top:{
    position:"absolute",
    backgroundColor:color.WHITE_TRANSPARENT,
    top:0,
    height:"15%",
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:20,
    paddingTop:30,
    paddingBottom:0
  },
  bottom:{
    position:"absolute",
    backgroundColor:"red",
    bottom:0,
    height:"15%",
    width:"100%"
  },
  greetingText:{
    fontFamily: font.BOLD,
    fontSize: 22,
    color:color.BLACK_PRIMARY,
  },
  userImg:{
    height:65,
    width:65,
    borderRadius: 1000,
    backgroundColor: color.BLUE_PRIMARY,
  }
});