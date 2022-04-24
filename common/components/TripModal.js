import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../theme/color';
import { Icon } from 'react-native-elements';
import StepOne from './trip-modals/StepOne';
import StepTwo from './trip-modals/StepTwo';
import StepThree from './trip-modals/StepThree';
import StepFour from './trip-modals/StepFour';
import { AddBookingRequest } from '../functions/Booking';
import { font } from '../theme/font';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NO_OF_STATES = 4;
const numbers = [1,2,3,4]

export default function TripModal(props) {
  const {
    modalVisible, setModalVisible, 
    currentState, setCurrentState,
    from, setFrom,
    to, setTo,
    seats, setSeats,
    isSchedule, setIsSchedule,
    carType, setCarType,
    distance ,setDistance,
    duration, setDuration,
    price, setPrice,
    selectedPayment ,setSelectedPayment,
    promo,setPromo,
    driver,setDriver,
    locationChoose, setLocationChoose,
    choosePickup, chooseDropoff,
    setCoords, userLocation
  } = props;

  const handleNext = () => {
    let cs = currentState;
    if(cs !== NO_OF_STATES){
      setCurrentState(cs+1)
    }
    if((cs) === 3){
      handleConfirm()
    }
  }

  const handlePrevious = () => {
    let cs = currentState;
    if(cs === 1 ){
      setFrom(userLocation)
      setTo(null)
      setLocationChoose(false)
      setCoords(null)
      setModalVisible(false)
    } else if(cs <= NO_OF_STATES){
      setCurrentState(cs-1)
    }
  }  
  
  const handleConfirm = () => {
    AddBookingRequest({
      carType: carType,
      seats: seats,
      pickup:from,
      dropoff: to,
      initialPrice:10,
      finalPrice: 10,
      paid: false,
      paymentMethod: selectedPayment,
      status : "NEW"
    })
  }

  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible && !locationChoose}
    > 
      <View style={styles.container}>
        <View style={styles.containerTop}>
          {numbers.map((item, index) => 
            currentState >= item ?
            <View key={index} style={styles.numberBox}>
              <Text style={styles.boxText}>{item}</Text>
            </View>
            :
            <View key={index} style={styles.numberBoxInactive}>
              <Text style={styles.boxTextInactive}>{item}</Text>
            </View>
          )}
        </View>
        <View style={styles.containerBottom}>
          {currentState === 1 &&
            <StepOne
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              from={from} setFrom={setFrom}
              to={to} setTo={setTo}
              seats={seats} setSeats={setSeats}
              setLocationChoose={setLocationChoose}
              locationChoose={locationChoose}
              choosePickup={choosePickup}
              chooseDropoff={chooseDropoff}
            />
          }
          {currentState === 2 &&
            <StepTwo
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              from={from} setFrom={setFrom}
              to={to} setTo={setTo}
              carType={carType} setCarType={setCarType}
              distance={distance} setDistance={setDistance}
              duration={duration} setDuration={setDuration}
              price={price} setPrice={setPrice}
            />
          }
          {currentState === 3 &&
            <StepThree
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment}
              promo={promo} setPromo={setPromo}
            />
          }
          {currentState === 4 &&
            <StepFour
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              driver={driver}
              distance={distance} setDistance={setDistance}
              duration={duration} setDuration={setDuration}
              price={price} setPrice={setPrice}
              from={from} setFrom={setFrom}
              to={to} setTo={setTo}
              modalVisible={modalVisible} setModalVisible={setModalVisible}
            />
          }
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height:HEIGHT/1.2,
    width:WIDTH,
    backgroundColor:color.BLUE_PRIMARY,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    bottom:0,
    position:"absolute",
    // borderTopRightRadius: 45,
    // borderTopLeftRadius: 45
  },
  containerTop:{
    flex:1,
    backgroundColor:color.BLUE_PRIMARY,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    justifyContent:"space-evenly",
    alignItems:"center",
    flexDirection:"row"
  },
  containerBottom:{
    flex:5,
    backgroundColor:color.WHITE_PRIMARY,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    // backgroundColor:"green"
  },
  numberBox:{
    backgroundColor:color.WHITE_PRIMARY,
    height: 45,
    width:45,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5
  },
  boxText:{
    fontFamily: font.SEMI_BOLD,
    color: color.BLUE_PRIMARY,
    fontSize: 18,
  },
  numberBoxInactive:{
    backgroundColor:color.WHITE_TRANSPARENT,
    height: 45,
    width:45,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5
  },
  boxTextInactive:{
    fontFamily: font.SEMI_BOLD,
    color: color.WHITE_PRIMARY,
    fontSize: 18,
  }
});
