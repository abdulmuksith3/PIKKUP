import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';
import ButtonPrimary from '../ButtonPrimary'
import ButtonSecondary from '../ButtonSecondary';
import { font } from '../../theme/font';
export default function StepOne(props) {
  const {
    from, setFrom,
    to, setTo,
    seats, setSeats,
    setLocationChoose,
    locationChoose,
    choosePickup, chooseDropoff,
    handleNext,
    handlePrevious
  } = props;

  const validate = () => {
    if(from && to){
      handleNext()
    } else {
      showErrorMessage("Please Choose Pick-Up/Drop-Off Location")
    }
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.titleText}>Location</Text>
        <TouchableOpacity onPress={()=>choosePickup()}>
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
        <TouchableOpacity  onPress={()=>chooseDropoff()}>
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
      <View style={styles.containerCenter}>
        <Text style={styles.titleText}>Time & Seats</Text>
        <View style={styles.passengerContainer}>
          <View style={styles.passengerTextContainer}>
            <Text style={styles.passengerText}>No. of Passengers</Text>
          </View>
          <View style={styles.passengerBoxContainer}>
            {[1,2,3,4].map( (item) => 
            <TouchableOpacity onPress={()=>setSeats(item)} key={item} style={seats === item ? styles.numberBox : styles.numberBoxInactive}>
              <Text style={seats === item ? styles.boxText : styles.boxTextInactive}>{item}</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.passengerContainer}>
          <View style={styles.passengerTextContainer}>
            <Text style={styles.passengerText}>Schedule Time</Text>
          </View>
          <View style={styles.passengerBoxContainer}>
            <TouchableOpacity style={styles.numberBox}>
              <Text style={styles.boxTextTwo}>NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent:"space-evenly"
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
    height: 40,
    width:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5
  },
  boxText:{
    fontFamily: font.SEMI_BOLD,
    color: color.WHITE_PRIMARY,
    fontSize: 16,
  },
  boxTextTwo:{
    fontFamily: font.REGULAR,
    color: color.WHITE_PRIMARY,
    fontSize: 12,
  },
  numberBoxInactive:{
    backgroundColor:color.BLUE_SECONDARY,
    height: 40,
    width:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
    marginLeft: 5
  },
  boxTextInactive:{
    fontFamily: font.SEMI_BOLD,
    color: color.BLACK_PRIMARY,
    fontSize: 16,
  },
});
