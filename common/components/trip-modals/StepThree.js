import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform, Text} from 'react-native';
import { color } from '../../theme/color';
import { Icon } from 'react-native-elements';
import { showErrorMessage } from '../../functions/FlashMessage';
import ButtonPrimary from '../ButtonPrimary'
import ButtonSecondary from '../ButtonSecondary';
import { font } from '../../theme/font';

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
      <View style={styles.containerTop}>
        <Text style={styles.titleText}>Select Payment</Text>
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionIconContainer}>
            <Icon
              name={'attach-money'}
              size={30}
              color={color.WHITE_PRIMARY}
              type={"material"}
            />
          </View>
          <Text style={styles.optionText}>Cash Payment</Text>
          <Icon
            name={'checkcircle'}
            size={30}
            color={color.BLUE_PRIMARY}
            type={"antdesign"}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled style={[styles.optionButton]}>
          <View style={[styles.optionIconContainer, {backgroundColor: color.GRAY_PRIMARY}]}>
            <Icon
              name={'loader'}
              size={30}
              color={color.WHITE_PRIMARY}
              type={"feather"}
            />
          </View>
          <Text style={[styles.optionText, {color: color.GRAY_PRIMARY}]}>Coming Soon</Text>
          <Icon
            name={'checkcircle'}
            size={30}
            color={color.GRAY_PRIMARY}
            type={"antdesign"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerCenter}>
        <Text style={styles.titleText}>Promo Code</Text>
        <TouchableOpacity disabled style={styles.promoButton}>
          <Text style={[styles.optionText, {color: color.GRAY_PRIMARY}]}>COMING SOON</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBottom}>
        <ButtonSecondary 
          backIcon={true}
          size={"small"}
          onPress={()=>handlePrevious()}
        />
        <ButtonPrimary 
          title={"Confirm Booking"}
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
    flex:3,
    // backgroundColor: 'red',
  },
  containerCenter:{
    flex:2.5,
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
  optionIconContainer:{
    backgroundColor:color.BLUE_PRIMARY,
    height: 55,
    width:55,
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
    height:80,
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:5,
    paddingRight:15,
    marginBottom:5
  },
  promoButton:{
    backgroundColor:color.WHITE_PRIMARY,
    borderWidth:1,
    borderColor: color.BLUE_PRIMARY,
    borderStyle:'dashed',
    borderRadius:10,
    height:80,
    justifyContent:"center",
    alignItems:"center",
    marginTop:5
  }
});
