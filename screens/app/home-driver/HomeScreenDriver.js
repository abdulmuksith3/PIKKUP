import React, {useEffect, useState, useContext, useRef} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from './Styles'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps"
import { mapStyle } from '../../../common/theme/map';
import * as Location from 'expo-location';
import Avatar from '../../../assets/images/avatar.png'
import { UserContext } from '../../../App';
import TripModal from '../../../common/components/TripModal';
import { getRoute } from '../../../common/functions/TomTom';
import { color } from '../../../common/theme/color';
import { acceptRequest, getActiveBooking, getRequests } from '../../../common/functions/Booking';
import {logout, updateLocation} from '../../../common/functions/Authentication'
import { logMessage } from '../../../common/functions/Log';
import db from '../../../db';
import firebase from 'firebase';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const QATAR_REGION = {
  latitude: 25.103681027191968,
  latitudeDelta: 2.6178596114955006,
  longitude: 51.21374202892184,
  longitudeDelta: 1.3360247388482094,
}

export default function HomeScreenDriver({navigation}) {
  const {state, dispatch} = useContext(UserContext);
  const {user} = state;
  const mapRef = useRef();
  const [location, setLocation] = useState(null);
  const [regionLocation, setRegionLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [currentState, setCurrentState] = useState(1);
  
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [seats, setSeats] = useState(1);
  const [isSchedule, setIsSchedule] = useState(false);
  const [locationChoose, setLocationChoose] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [dropoff, setDropoff] = useState(false);

  const [carType, setCarType] = useState(0);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promo, setPromo] = useState(null);

  const [driver, setDriver] = useState(null);

  const [currentBooking, setCurrentBooking] = useState(null);
  const [requests, setRequests] = useState(null);
  const [status, setStatus] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      await Location.watchPositionAsync({}, async (location) => {
        setLocation(location);
        updateLocation(location)
      });
    })();
  }, []);

  // useEffect(() => {
  //   if(errorMsg){
  //     console.log("LOCATION ERROR")
  //   }
  // }, [errorMsg]);\
  useEffect(() => {
    if(location){
      animateToUserLoc(location)
    }
  }, [location]);
  
  useEffect(() => {
    if(user.requests){
      handleRequests()
    } else {
      setRequests(null)
    }
  }, [user.requests]);


  useEffect(() => {
    if(user.activeBooking){
      handleActiveBooking()
    } else {
      setCurrentBooking(null)
    }
  }, [user.activeBooking]);

  const handleRequests = () => {
    try {
      db.ref(`users/${firebase.auth().currentUser.uid}/requests`).on('value', (snapshot) => {
        if(snapshot.val()){
          let requests = []
          snapshot.forEach(async (childSnapshot) => {  
            const req = childSnapshot.val()
            await db.ref(`users/${req.riderId}`).once('value', (rider) => { 
              requests.push({...req, rider: rider})
            })
            if(requests.length > 0){
              setRequests(requests)
            }
          })
        }
      })
    } catch (error) {
        logMessage({
            title: 'getActiveBooking Error',
            body: error.message,
        })     
    }
  }

  const handleActiveBooking = async () => {
    try {
      db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).on('value', async (snapshot)=>{
        if(snapshot.val()){
          const {id, status} = snapshot.val()
          if(status === "NEW"){
              const childSnapshot = await db.ref(`bookingRequest/${id}`).once('value')
              if(childSnapshot.val()){
                  setCurrentBooking(childSnapshot.val())
              } else {
                  setCurrentBooking(null)
              }
          } else {
              const childSnapshot = await db.ref(`bookings/${id}`).once('value')
              if(childSnapshot.val()){
                  setCurrentBooking(childSnapshot.val())
              } else {
                  setCurrentBooking(null)
              }
          }
      } else {
          setCurrentBooking(null)
      }
      })
    } catch (error) {
        logMessage({
            title: 'getActiveBooking Error',
            body: error.message,
        })     
    }
  }

  const animateToUserLoc = (location) => {
    let loc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    mapRef.current.animateToRegion(loc, 1 * 1000);
  };
  
  useEffect(() => {
      console.log("CUREE ", currentBooking)
  }, [currentBooking]);



  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        loadingEnabled
        style={{height:"100%", width:"100%"}}
        initialRegion={QATAR_REGION}
        // onRegionChange={setRegionLocation}
        customMapStyle={mapStyle}
      >
        {coords &&
          <Polyline
            coordinates={coords}
            strokeColor={color.BLUE_PRIMARY} 
            strokeWidth={4}
          />
        }
        {location && 
          <Marker
            coordinate={location.coords}
            title={"You"}
            description={"Your current location"}
            pinColor={color.BLUE_PRIMARY}
          />
        }
        {to &&
          <Marker
            coordinate={to}
            title={"Destination"}
            pinColor={color.BLUE_PRIMARY}
          />
        }
      </MapView>
        
      {requests && (!currentBooking || currentBooking?.status === "NEW") &&
        <View style={styles.bottom}>
            <TouchableOpacity style={styles.searchButton} onPress={()=> acceptRequest(requests[0])}>
              <Text style={styles.searchText}> 
                Accept Request   {user?.fullname }
              </Text>
            </TouchableOpacity>
        </View>
      }
    </View>
  );
}



