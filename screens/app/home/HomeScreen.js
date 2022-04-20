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
import { getActiveBooking, getDrivers } from '../../../common/functions/Booking';
import {logout, updateLocation} from '../../../common/functions/Authentication'

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

  const [carType, setCarType] = useState(0);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promo, setPromo] = useState(null);

  const [driver, setDriver] = useState(null);

  const [currentBooking, setCurrentBooking] = useState(null);
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
  // }, [errorMsg]);
  
  useEffect(() => {
    if(user.activeBooking){
      handleActiveBooking()
    } else {
      setCurrentBooking(null)
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
        discount
      } = currentBooking;

      setCarType(carType)
      setFrom(pickup)
      setTo(dropoff)
      setPrice(finalPrice)
      setSelectedPayment(paymentMethod)
      setSeats(seats)
      setPromo(discount)
      setCurrentState(4)
      setModalVisible(true)
    } else {
      setCarType(null)
      setFrom(null)
      setTo(null)
      setPrice(null)
      setSelectedPayment(null)
      setSeats(null)
      setPromo(null)
      setCurrentState(1)
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

  const handleActiveBooking = async () => {
    const booking = await getActiveBooking()
    setCurrentBooking(booking)
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
    getDrivers()
  }, []);



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
        
      </MapView>
      {!modalVisible && 
      <>
        <View style={styles.top}>
          <Text onPress={()=> logout()} style={styles.greetingText}>Hello, {user?.fullname }</Text>
          <Image source={Avatar} style={styles.userImg} />
        </View>
      
        <View style={styles.bottom}>
          <View>
            <Text>Saved Locations</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.searchButton} onPress={()=>setModalVisible(true)}>
              <Text style={styles.searchText}>Where are you going?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
      }
      {locationChoose &&
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.searchButton} onPress={()=> handleLocationPick()}>
            <Text style={styles.searchText}> 
              {
              pickup ? "Confirm Pick Up" : 
              dropoff ? "Confirm Drop-Off" : "Continue"
              }
              </Text>
          </TouchableOpacity>
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
        driver={driver} setDriver={setDriver}
        locationChoose={locationChoose} setLocationChoose={setLocationChoose}
        chooseDropoff={chooseDropoff} choosePickup={choosePickup}
        setCoords={setCoords} userLocation={location?.coords}
      />
    </View>
  );
}



