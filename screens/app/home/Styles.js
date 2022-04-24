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
  bottomMain:{
    position:"absolute",
    bottom:0,
    minHeight:"15%",
    width:"100%",
    justifyContent:"flex-end",
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
  },
  locationScrollView:{
    paddingLeft: 30,
    marginBottom: 10
  },
  locationContainer:{
    flexDirection:"row",
    height: 55,
    width: 120,
    borderRadius: 10,
    backgroundColor: color.WHITE_PRIMARY,
    marginRight: 15,
    alignItems:"center",
    shadowColor: color.BLUE_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  iconContainer:{
    backgroundColor: color.BLUE_PRIMARY,
    height: "100%",
    width: "40%",
    borderRadius: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  locationName: {
    paddingLeft: 10,
    fontFamily: font.REGULAR,
    fontSize: 14,
    color: color.BLACK_PRIMARY
  }
});