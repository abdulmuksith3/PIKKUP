import React, {useEffect, useState, useContext, useRef} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from './Styles'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps"
import { mapStyle } from '../../../common/theme/map';
import * as Location from 'expo-location';
import Avatar from '../../../assets/images/avatar.png'
import Avatar2 from '../../../assets/images/avatar2.png'
import { UserContext } from '../../../App';
import TripModal from '../../../common/components/TripModal';
import { getRoute } from '../../../common/functions/TomTom';
import { color } from '../../../common/theme/color';
import {logout, updateLocation} from '../../../common/functions/Authentication'
import { logMessage } from '../../../common/functions/Log';
import db from '../../../db';
import firebase from 'firebase';
import { getUser } from '../../../common/functions/Authentication';
import { COMPLETED, NEW, PAID } from '../../../common/constants/BookingStatus';
import { Icon } from 'react-native-elements';
import { CAR_TYPES } from '../../../common/constants/Cars';
import { LOCATIONS } from '../../../common/constants/Locations';
import { showSuccessMessage } from '../../../common/functions/FlashMessage';
import ButtonPrimary from '../../../common/components/ButtonPrimary';

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

export default function HomeScreen({navigation}) {
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

  const [carType, setCarType] = useState(CAR_TYPES[0]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [promo, setPromo] = useState(null);

  const [driver, setDriver] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);

  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [coords, setCoords] = useState(null);
  const [driverPickupRoute, setDriverPickupRoute] = useState(null);

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
  // }, [errorMsg]);
  
  useEffect(() => {
    if(user.activeBooking){
      handleActiveBooking()
    }
  }, [user.activeBooking]);

  useEffect(() => {
    if(location){
      animateToUserLoc(location)
    }
    if(location && !from){
      setFrom({latitude : location.coords.latitude , longitude : location.coords.longitude})
    }

  }, [location]);

  useEffect(() => {
    if(currentBooking){
      let {
        carType, 
        pickup, 
        dropoff, 
        initialPrice, 
        finalPrice,
        paymentMethod,
        seats,
        status,
        discount,
        driverId
      } = currentBooking;

      setCarType(carType)
      setFrom(pickup)
      setTo(dropoff)
      setPrice(finalPrice)
      setSelectedPayment("COD")
      setSeats(seats)
      setPromo(discount)
      setCurrentState(4)
      setDriver(driverId)
      setModalVisible(true)
    } else {
      setCarType(CAR_TYPES[0])
      setFrom(location?.coords)
      setTo(null)
      setPrice(null)
      setSelectedPayment("COD")
      setSeats(1)
      setPromo(null)
      setCurrentState(1)
      setDriver(null)
      setModalVisible(false)
    }
  }, [currentBooking]);

  useEffect(() => {
    if(from && to){
      handleRoute(from, to)
    } else {
      setCoords(null)
    }
  }, [from , to]);

  const handleActiveBooking = () => {
    try {
      db.ref(`users/${firebase.auth().currentUser.uid}/activeBooking`).on('value', async (snapshot)=>{
        if(snapshot.val()){
            const {bookingId, requestId, status} = snapshot.val()
            if(status === NEW){
                const childSnapshot = await db.ref(`bookingRequest/${requestId}`).once('value')
                if(childSnapshot.val()){
                    setCurrentBooking(childSnapshot.val())
                } else {
                    setCurrentBooking(null)
                }
            } else {
              db.ref(`bookings/${bookingId}`).on('value', (childSnapshot)=>{
                if(childSnapshot.val()){
                  setCurrentBooking(childSnapshot.val())
                } else {
                  setCurrentBooking(null)
              }
              })
              db.ref(`bookings/${bookingId}/bookingRequest/${requestId}`).on('value', (childSnapshot)=>{
                if(childSnapshot.val()){
                  setCurrentRequest(childSnapshot.val())
                } else {
                  setCurrentRequest(null)
              }
              })
            }
        } else {
            setCurrentBooking(null)
        }
      })
    } catch (error) {
        logMessage({
            title: 'handleActiveBooking Error',
            body: error.message,
        })     
    }
  }

  const choosePickup = () => {
    setDropoff(false)
    setPickup(true)
    setLocationChoose(true)
  }
  const chooseDropoff = () => {
    setPickup(false)
    setDropoff(true)
    setLocationChoose(true)
  }

  const handleLocationPick = () => {
    let tempLoc = location.coords;
    if(regionLocation){
      tempLoc = regionLocation
    }
    if(pickup){
      setFrom({ latitude : tempLoc.latitude , longitude : tempLoc.longitude })
      chooseDropoff()
    }
    if(dropoff){
      let to = { latitude : tempLoc.latitude , longitude : tempLoc.longitude }
      setTo(to)
      setDropoff(false)
    }
    if(from && to){
      setLocationChoose(false)
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
  
  const handleRoute = async (from, to) => {
    const {route, distance, duration} = await getRoute(from, to);
    setCoords(route)
    setDistance(distance)
    setDuration(duration)
  }

  useEffect(() => {
    if(driver){
      handleDriver()
    } else {
      setDriverDetails(null)
      setDriverPickupRoute(null)
    }
  }, [driver]);
  
  useEffect(() => {
    if(driverDetails){
      handleDriverPickupRoute()
    }
  }, [driverDetails]);

  const handleDriverPickupRoute = async () => {
    const driverLoc = {
      latitude: driverDetails.lastLocation?.coords.latitude,
      longitude: driverDetails.lastLocation?.coords.longitude
    }
    const riderLoc = await getRiderPickupLocation()
    const {route} = await getRoute(driverLoc, riderLoc);
    setDriverPickupRoute(route)
  }

  const getRiderPickupLocation = async () => {
    const requestId = user?.activeBooking?.requestId;
    if(requestId) {
      let data = currentBooking?.bookingRequest;
      const bookings = Object.keys(data).map((i) => {
        data[i].id = i
        return data[i]
      })
      const riderRequest = bookings.filter((item) => item.id === requestId)[0];
      let riderLoc = {
        latitude: riderRequest.pickup.latitude,
        longitude: riderRequest.pickup.longitude
      }
      return riderLoc;
    }
  }

  const handleDriver = () => {
    if(driver){
      try {
        db.ref(`users/${driver}`).on('value', (snapshot)=> {
          if(snapshot.val()){
            setDriverDetails(snapshot.val())
          } else{
            setDriverDetails(null);
          }
        })
      } 
      catch (error) {
        logMessage({
            title: 'handleDriver Error',
            body: error.message,
        })
        setDriverDetails(null);
    }
    }
  }

  const handleSavedLocationPress = (item) => {
    setTo({latitude: item.lat, longitude: item.lng})
    setModalVisible(true)
  }
  const handleRiderComplete = () => {
    setCurrentBooking(null)
    setCurrentRequest(null)
  }
  

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingEnabled
        style={{height:"100%", width:"100%"}}
        initialRegion={QATAR_REGION}
        onRegionChange={locationChoose ? setRegionLocation : null}
        customMapStyle={mapStyle}
      >
        {coords &&
          <Polyline
            coordinates={coords}
            strokeColor={color.BLUE_PRIMARY} 
            strokeWidth={4}
          />
        }
        {/* {location && 
          <Marker
            coordinate={location.coords}
            title={"You"}
            description={"Your current location"}
          />
        } */}
        {locationChoose && regionLocation && (!from || !to) &&
          <Marker
            coordinate={regionLocation}
          />
        }
        {from &&
          <Marker
            coordinate={from}
          />
        }
        {to &&
          <Marker
            coordinate={to}
          />
        }
        {driverDetails &&
          <Marker
            coordinate={driverDetails.lastLocation?.coords}
            pinColor={color.BLUE_PRIMARY}
          />
        }
        {driverPickupRoute &&
          <Polyline
            coordinates={driverPickupRoute}
            strokeColor={color.BLUE_PRIMARY} 
            strokeWidth={4}
          />
        }
        
      </MapView>
      {!modalVisible && !currentRequest &&
        <>
          <View style={styles.top}>
            <Text style={styles.greetingText}>Hello, Rider 3</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')} >
              <Image source={Avatar2} style={styles.userImg} />
            </TouchableOpacity>
          </View>
        
          <View style={styles.bottomMain}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.locationScrollView}>
            {
              LOCATIONS?.map( (item, index )=> 
                <TouchableOpacity key={index} style={styles.locationContainer} onPress={()=>handleSavedLocationPress(item)}>
                  <View style={styles.iconContainer}>
                    <Icon
                    name={item.iconName}
                    size={item.iconSize}
                    color={color.WHITE_PRIMARY}
                    type={item.iconType}
                    />
                  </View>
                  <Text style={styles.locationName}>{item.name}</Text>
                </TouchableOpacity>
              )
            }
            <View style={{width:50}}></View>
            </ScrollView>
            <View>
              <TouchableOpacity style={styles.searchButton} onPress={()=>setModalVisible(true)}>
                <Icon
                  size={25}
                  type={"feather"}
                  name={"search"}
                  color={color.BLUE_PRIMARY}
                />
                <Text style={styles.searchText}>Where are you going?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
      {!modalVisible && currentRequest && currentBooking && (currentRequest?.status !== COMPLETED && currentRequest?.status !== PAID) &&
      <>
        <View style={styles.top}>
          <Text style={styles.greetingText}>TRIP {currentRequest?.status}</Text>
        </View>
      </>
      }
      { currentRequest && currentBooking && (currentRequest?.status === COMPLETED || currentBooking?.status !== COMPLETED) &&
        <View style={styles.bottom}>
          <ButtonPrimary 
            title={"Complete & Close"}
            size={"large"}
            onPress={()=> handleRiderComplete()}
          />
        </View>
      }
      {locationChoose && !currentRequest &&
        <View style={styles.bottom}>
          <ButtonPrimary 
            title={
              pickup ? "Confirm Pick Up" : 
              dropoff ? "Confirm Drop-Off" : "Continue"
            }
            size={"large"}
            onPress={()=> handleLocationPick()}
          />
      </View>
      }
      <TripModal 
        modalVisible={modalVisible} setModalVisible={setModalVisible}  
        currentState={currentState} setCurrentState={setCurrentState}
        from={from} setFrom={setFrom}
        to={to} setTo={setTo}
        seats={seats} setSeats={setSeats}
        isSchedule={isSchedule} setIsSchedule={setIsSchedule}
        carType={carType} setCarType={setCarType}
        distance={distance} setDistance={setDistance}
        duration={duration} setDuration={setDuration}
        price={price} setPrice={setPrice}
        selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment}
        promo={promo} setPromo={setPromo}
        driver={driverDetails} setDriver={setDriver}
        locationChoose={locationChoose} setLocationChoose={setLocationChoose}
        chooseDropoff={chooseDropoff} choosePickup={choosePickup}
        setCoords={setCoords} userLocation={location?.coords}
      />
    </View>
  );
}



