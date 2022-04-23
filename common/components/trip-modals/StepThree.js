import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function StepThree(props) {
  const {
    handleNext,
    handlePrevious,
    selectedPayment ,setSelectedPayment,
    promo,setPromo,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const validate = () => {
    handleNext()
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={()=>setSelectedPayment("COD")}>
          <Text>COD</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>setSelectedPayment("CARD")}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>setSelectedPayment("2")}>
          <Text>3</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <Text>ADD PROMO CODE</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={()=>handlePrevious()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>validate()}>
          <Text>Confirm Booking</Text>
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
