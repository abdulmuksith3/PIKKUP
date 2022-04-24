import { StyleSheet } from 'react-native';
import { color } from '../../../common/theme/color';
import { font } from '../../../common/theme/font'
export const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.BLUE_PRIMARY
  },
  containerTop: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  containerBottom: {
    flex: 2,
    justifyContent:"center",
    // alignItems:"center",
    backgroundColor:color.WHITE_PRIMARY,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

  },
  topHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-end",
    width: "90%",
    flex:1,
    // backgroundColor:"green"
  },
  topBody:{
    justifyContent:"center",
    alignItems:"center",
    width: "90%",
    flex:3,
    // backgroundColor:"red"
  },
  logoutText:{
    fontFamily: font.REGULAR,
    color: color.WHITE_PRIMARY,
    fontSize: 18
  },
  userImg:{
    width: 85,
    height: 85
  },
  nameText:{
    fontFamily: font.SEMI_BOLD,
    color: color.WHITE_PRIMARY,
    fontSize: 22,
    marginTop:"1%"
  },
  emailText:{
    fontFamily: font.REGULAR,
    color: color.WHITE_PRIMARY,
    fontSize: 16,
    marginTop:"1%"
  },
  titleText:{
    fontFamily: font.BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 22,
    marginTop:"4%",
    width: "90%",
    alignSelf:"center"
  },
  scrollView:{
    width:"90%",
    alignSelf: "center"
  },
  optionIconContainer:{
    backgroundColor:color.BLUE_PRIMARY,
    height: 75,
    width:75,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 10
  },
  optionText:{
    fontFamily: font.REGULAR,
    color: color.BLACK_PRIMARY,
    fontSize: 18,
  },
  optionButton:{
    flexDirection:"row",
    backgroundColor:color.BLUE_SECONDARY,
    borderRadius:10,
    height:100,
    alignItems:"center",
    paddingLeft:5,
    paddingRight:15,
    marginTop:15
  },
});