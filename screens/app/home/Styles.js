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
    // backgroundColor:"red",
    bottom:0,
    height:"15%",
    width:"100%",
    justifyContent:"flex-end",
    // alignItems:"center"
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
  searchButton:{
    height: 55,
    width:"87%",
    borderRadius: 15,
    alignItems:"center",
    flexDirection:"row",
    backgroundColor:color.WHITE_PRIMARY,
    alignSelf:"center",
    marginBottom: 25,
    paddingLeft: 20,
    shadowColor: color.GRAY_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

  },
  searchText:{
    paddingLeft: 10,
    fontFamily: font.REGULAR,
    fontSize: 16,
    color: color.BLACK_PRIMARY
  }
});