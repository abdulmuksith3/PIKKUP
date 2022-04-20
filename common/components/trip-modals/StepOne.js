import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';

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
      <View>
        <TouchableOpacity onPress={()=>choosePickup()}>
          <Text>{from ? from.latitude : "Current Location"}</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>chooseDropoff()}>
          <Text>{to ? to.latitude : "Choose Location"}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>3</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>now</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=>handlePrevious()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>validate()}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: color.BLUE_SECONDARY,
  },
});
