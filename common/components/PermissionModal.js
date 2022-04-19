import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, Linking} from 'react-native';
import { color } from '../theme/color';
import { Icon } from 'react-native-elements';
import { font } from '../theme/font';
import ButtonPrimary from './ButtonPrimary';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PermissionModal(props) {
  const {modalVisible, setModalVisible} = props;
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    setModalVisible(false);
  }}
  >
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(false)}>
              <Icon
                name={'close'}
                size={22}
                color={color.BLACK}
                type={'material'}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>Please give permission to access the camera</Text>
          <ButtonPrimary
            title={'Open Settings'}
            size={'Medium'}
            onPress={()=> Linking.openSettings()}
          />
        </View>
      </View>
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:color.BLACK_TRANSPARENT,
    justifyContent:"center",
    alignItems:"center"
  },
  innerContainer: {
    backgroundColor:color.WHITE_PURE,
    height: "25%",
    width:"75%",
    borderRadius: 10,
    alignItems:"center"
    // alignSelf:"center"
  },
  header:{
    // backgroundColor:"yellow",
    alignItems:"flex-end",
    justifyContent:"center",
    width:"95%",
    flex:1
  },
  body:{
    // backgroundColor:"green",
    alignItems:"center",
    width:"95%",
    flex:5,
    justifyContent:"space-evenly"
  },
  text:{
    color: color.BLACK,
    fontFamily: font.MEDIUM,
    fontSize:18
  }
});
