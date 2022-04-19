import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Platform} from 'react-native';
import { Camera } from 'expo-camera';
import { color } from '../theme/color';
import { Icon } from 'react-native-elements';
import PermissionModal from './PermissionModal';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TripModal(props) {
  const {modalVisible, setModalVisible} = props;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleShutterPress = async  () => {
    try {
      takePicture()
    } catch (error) {
      
    }
  }
  

  if (hasPermission === false || hasPermission === null) {
    return (
      <PermissionModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
      setModalVisible(false);
    }}
    > 
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity onPress={()=> setModalVisible(false)} style={styles.backButton}>
            <Icon
              name={'arrow-left'}
              size={28}
              color={color.WHITE_PURE}
              type={'feather'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> handleShutterPress()}
          >
            <Icon
              name={'camera'}
              size={30}
              color={color.WHITE_PURE}
              type={'feather'}
            />
          </TouchableOpacity>
        </View>
        <Camera 
          ref={cameraRef} 
          style={styles.camera} 
          type={type} 
          autoFocus={true}
          // ratio={'1:1'}
          // pictureSize={"352x288"}
          // pictureSize={"Low"}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    // flex: 1,
    height: HEIGHT
  },
  button: {
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: color.BLUE_PRIMARY,
    width: 80,
    height: 80,
    borderRadius: 1000
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  containerTop:{
    backgroundColor: color.BLACK_TRANSPARENT,
    position:"absolute",
    top: 0,
    height: 100,
    width: WIDTH,
    zIndex:1,
    justifyContent:"center",
    alignItems:"flex-start",
    paddingTop : Platform.OS === 'ios' ? '6%' : 0
  },
  containerBottom:{
    backgroundColor: color.BLACK_TRANSPARENT,
    position:"absolute",
    bottom: 0,
    height: 130,
    width: WIDTH,
    zIndex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  backButton:{
    // backgroundColor:"red",
    marginLeft: 20
  }
});
