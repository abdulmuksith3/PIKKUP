import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text, Image} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';
import ButtonPrimary from '../ButtonPrimary'
import ButtonSecondary from '../ButtonSecondary';
import { font } from '../../theme/font';
import { CAR_TYPES } from '../../constants/Cars';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StepTwo(props) {
  const {
    from,
    to, 
    carType, setCarType,
    distance ,setDistance,
    duration, setDuration,
    price, setPrice,
    handleNext,
    handlePrevious
  } = props;

  const validate = () => {
      handleNext()
  }
  
  
  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
        <Text style={styles.titleText}>Select Car</Text>
        <View style={styles.carsContainer}>
            {CAR_TYPES?.map( (item, index) => 
            <View key={index} style={styles.carView}>
              <TouchableOpacity onPress={()=>setCarType(item)} style={carType.id === item.id ? styles.numberBox : styles.numberBoxInactive}>
                <Image source={item.image} />
              </TouchableOpacity>
              <Text style={carType.id === item.id ? styles.boxText : styles.boxTextInactive}>{item.type}</Text>
            </View>
            )}
        </View>
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
        <Text style={styles.titleText}>Trip</Text>
        <TouchableOpacity disabled>
          <View style={styles.locationHeadContainer}>
            <Icon
              name={'pin-outline'}
              size={22}
              color={color.BLUE_PRIMARY}
              type={"ionicon"}
            />
            <Text style={styles.locationHeadText}>Pick Up</Text>
          </View>
            <Text style={styles.locationBodyText}>{from ? `${from.latitude}, ${from.longitude}` : "Current Location"}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled>
          <View style={styles.locationHeadContainer}>
            <Icon
              name={'pin'}
              size={22}
              color={color.BLUE_PRIMARY}
              type={"ionicon"}
            />
            <Text style={styles.locationHeadText}>Drop Off</Text>
          </View>
          <Text style={styles.locationBodyText}>{to ? `${to.latitude}, ${to.longitude}` : "Choose Location"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <ButtonSecondary 
          backIcon={true}
          size={"small"}
          onPress={()=>handlePrevious()}
        />
        <ButtonPrimary 
          title={"Continue"}
          size={"medium"}
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
  numberBoxInactive:{
    backgroundColor:color.BLUE_SECONDARY,
    height: 80,
    width:80,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5
  },
  boxTextInactive:{
    fontFamily: font.SEMI_BOLD,
    color: color.GRAY_PRIMARY,
    fontSize: 12,
    marginTop:5
  },
  carsContainer:{
    marginTop:10,
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  carView:{
    alignItems:"center",
    justifyContent:"space-evenly"
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
  }

});