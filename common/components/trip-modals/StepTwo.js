import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';

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
      <View>
        <TouchableOpacity onPress={()=>setCarType(0)}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>setCarType(1)}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>setCarType(2)}>
          <Text>3</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={()=>choosePickup()}>
          <Text>{from ? from.latitude : "Current Location"}</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>chooseDropoff()}>
          <Text>{to ? to.latitude : "Choose Location"}</Text>
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
    backgroundColor: 'transparent',
  },
});
