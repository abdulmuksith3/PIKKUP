import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';

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
    driver,setDriver,
  } = props;

  const validate = () => {
    handleNext()
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Driver</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>1</Text>
        </View>
        <View>
          <Text>1</Text>
        </View>
        <View>
          <Text>1</Text>
        </View>
      </View>
      <View>
        <Text>Map</Text>
      </View>
      <View>
        <TouchableOpacity onPress={()=>handlePrevious()}>
          <Text>Cancel Booking</Text>
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