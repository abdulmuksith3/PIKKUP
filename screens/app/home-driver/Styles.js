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
    bottom:0,
    height:"15%",
    width:"90%",
    justifyContent:"center",
    alignItems:"center"
  },
  greetingText:{
    fontFamily: font.BOLD,
    fontSize: 22,
    color:color.BLACK_PRIMARY,
  },
  userImg:{
    height:60,
    width:60,
    borderRadius: 1000,
    backgroundColor: color.BLUE_PRIMARY,
  },
  requestModal:{
    position:"absolute",
    backgroundColor:color.BLUE_PRIMARY,
    bottom:0,
    height:"30%",
    width:"100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  whiteContainer:{
    flex:0.8,
    backgroundColor:color.WHITE_PRIMARY,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  containerTop:{
    flex:2,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  containerBottom:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"90%",
    alignSelf:"center"
  },
  requestText:{
    fontFamily: font.SEMI_BOLD,
    fontSize: 18,
    color:color.WHITE_PRIMARY,
  },
  riderText:{
    fontFamily: font.SEMI_BOLD,
    fontSize: 18,
    color:color.BLACK_PRIMARY,
    marginLeft:10
  },
  textContainer:{
    flex: 0.2,
    justifyContent:"center",
    paddingLeft: 30
  }
});