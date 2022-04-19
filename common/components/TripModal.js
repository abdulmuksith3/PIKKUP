import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../theme/color';
import { Icon } from 'react-native-elements';
import StepOne from './trip-modals/StepOne';
import StepTwo from './trip-modals/StepTwo';
import StepThree from './trip-modals/StepThree';
import StepFour from './trip-modals/StepFour';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NO_OF_STATES = 4;

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
    choosePickup, chooseDropoff
  } = props;

  useEffect(() => {
  
  }, []);

  const handleNext = () => {
    let cs = currentState;
    if(cs !== NO_OF_STATES){
      setCurrentState(cs+1)
    }
  }
  const handlePrevious = () => {
    let cs = currentState;
    if(cs === 1 ){
      setFrom(null)
      setTo(null)
      setLocationChoose(false)
      setModalVisible(false)
    } else if(cs <= NO_OF_STATES){
      setCurrentState(cs-1)
    }
  }
  
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible && !locationChoose}
    > 
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text onPress={()=>setModalVisible(false)}>{currentState}</Text>
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
    bottom:0,
    position:"absolute",
  },
  containerTop:{
    flex:1,
    backgroundColor:"red"
  },
  containerBottom:{
    flex:5,
    backgroundColor:"green"
  }
});
