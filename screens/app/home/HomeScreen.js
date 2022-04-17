import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import {styles} from './Styles'
import firebase from "firebase";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { mapStyle } from '../../../common/theme/map';
import * as Location from 'expo-location';
import Avatar from '../../../assets/images/avatar.png'
import { UserContext } from '../../../App';

const QATAR_REGION = {
  latitude: 25.103681027191968,
  latitudeDelta: 2.6178596114955006,
  longitude: 51.21374202892184,
  longitudeDelta: 1.3360247388482094,
}

export default function HomeScreen({navigation}) {
  const {state, dispatch} = useContext(UserContext);
  const {user} = state;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled
        style={{height:"100%", width:"100%"}}
        initialRegion={QATAR_REGION}
        // followsUserLocation
        // onPanDrag={onPanDrag}
        customMapStyle={mapStyle}
      />
      <View style={styles.top}>
        <Text style={styles.greetingText}>Hello, {user?.fullname }</Text>
        <Image source={Avatar} style={styles.userImg} />
      </View>
      <View style={styles.bottom}>
        <View>
          <Text>Saved Locations</Text>
        </View>
        <View>
          <Text>Search Bar</Text>
        </View>
      </View>
    </View>
  );
}

