import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text, Image} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';
import ButtonPrimary from '../ButtonPrimary'
import ButtonSecondary from '../ButtonSecondary';
import { font } from '../../theme/font';
import { cancelBooking } from '../../functions/Booking';
import MapImage from '../../../assets/images/map.png'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StepFour(props) {
  const {
    handleNext,
    handlePrevious,
    from, setFrom,
    to, setTo,
    carType, setCarType,
    distance ,setDistance,
    duration, setDuration,
    price, setPrice,
    driver,
    modalVisible, setModalVisible,
  } = props;

  const validate = () => {
    cancelBooking()
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.titleText}>Your Driver</Text>
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionIconContainer}>
            <Icon
              name={'user'}
              size={30}
              color={color.WHITE_PRIMARY}
              type={"antdesign"}
            />
          </View>
          <Text style={styles.optionText}>{driver ? "Driver Found" : "Looking for Driver"}</Text>
          <Icon
            // name={'checkcircle'}
            name={'loader'}
            size={30}
            color={color.BLUE_PRIMARY}
            // type={"antdesign"}
            type={"feather"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCenter}>
        <View style={styles.summaryContainer}>
          <View style={styles.summary}>
            <Icon
              name={'map'}
              size={24}
              color={color.GRAY_PRIMARY}
              type={"feather"}
            />
            <Text style={styles.summaryText}>2 km</Text>
          </View>
          <View style={styles.summary}>
            <Icon
              name={'clock'}
              size={24}
              color={color.GRAY_PRIMARY}
              type={"feather"}
            />
            <Text style={styles.summaryText}>10 min</Text>
          </View>
          <View style={styles.summary}>
            <Icon
              name={'attach-money'}
              size={24}
              color={color.GRAY_PRIMARY}
              type={"material"}
            />
            <Text style={styles.summaryText}>55 QR</Text>
          </View>
        </View>
        <TouchableOpacity disabled={driver ? false : true} onPress={()=>setModalVisible(false)} style={styles.mapButton}>
          <Text style={styles.mapText}>{driver ? "View Trip" : "Loading"}</Text>
          <Image source={MapImage} style={{resizeMode:"cover", width:"100%", borderRadius:15}} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <ButtonPrimary 
          title={"Cancel Booking"}
          size={"large"}
          onPress={()=>validate()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20
  },
  containerTop:{
    flex:2.5,
    // backgroundColor: 'red',
  },
  containerCenter:{
    flex:3,
    // backgroundColor: 'blue',
  },
  containerBottom:{
    flex:1,
    // backgroundColor: 'red',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  titleText:{
    fontSize: 20,
    fontFamily: font.BOLD,
    color: color.BLACK_PRIMARY,
    marginTop:25
  },
  locationHeadText:{
    fontSize: 16,
    fontFamily: font.SEMI_BOLD,
    color: color.BLACK_PRIMARY,
    marginLeft: 5
    // marginTop:25
  },
  locationBodyText:{
    fontSize: 14,
    fontFamily: font.REGULAR,
    color: color.BLACK_PRIMARY,
    marginTop:5,
    marginLeft:10
    // marginTop:25
  },
  locationHeadContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  passengerContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:"6%"
  },
  passengerTextContainer:{
    justifyContent:"center",
  },
  passengerText:{
    fontFamily: font.REGULAR,
    color: color.BLACK_PRIMARY,
    fontSize: 14,
  },
  passengerBoxContainer:{
    flexDirection:"row",
    alignItems:"center",
    // justifyContent:"space-evenly"
  },
  numberBox:{
    backgroundColor:color.BLUE_PRIMARY,
    height: 80,
    width:80,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5
  },
  boxText:{
    fontFamily: font.SEMI_BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 12,
    marginTop:5
  },
  summaryText:{
    fontFamily: font.SEMI_BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 14,
    marginTop:5,
    marginLeft:5
  },
  summaryContainer:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: color.GRAY_PRIMARY,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    height:45
  },
  summary:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  optionIconContainer:{
    backgroundColor:color.BLUE_PRIMARY,
    height: 75,
    width:75,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5
  },
  optionText:{
    fontFamily: font.SEMI_BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 16,
  },
  optionButton:{
    flexDirection:"row",
    backgroundColor:color.BLUE_SECONDARY,
    borderRadius:10,
    height:100,
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:5,
    paddingRight:15,
    marginTop:15
  },
  mapButton:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:"4%",
  },
  mapText:{
    position:"absolute",
    zIndex:1111,
    fontFamily: font.BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 18,
  }
});
