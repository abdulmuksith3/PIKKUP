import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from './Styles'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { mapStyle } from '../../../common/theme/map';
import * as Location from 'expo-location';
import Avatar from '../../../assets/images/avatar.png'
import { UserContext } from '../../../App';
import TripModal from '../../../common/components/TripModal';

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

  const [bookingStatus, setBookingStatus] = useState(null);

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

  // useEffect(() => {
  //   if(location && !from){
  //     const {latitude, longitude} = location.coords;
  //     setFrom({latitude, longitude})
  //   }
  // }, [location]);

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
    let tempLoc = location;
    if(regionLocation){
      tempLoc = regionLocation
    }
    if(pickup){
      setFrom({ latitude : tempLoc.latitude , longitude : tempLoc.longitude })
      chooseDropoff()
    }
    if(dropoff){
      setTo({ latitude : tempLoc.latitude , longitude : tempLoc.longitude })
      setDropoff(false)
    }
    if(from) {
      console.log("FROMTO ", from)
      setLocationChoose(false)
    }
    // console.log({from, to})
  }
  

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        loadingEnabled
        style={{height:"100%", width:"100%"}}
        initialRegion={QATAR_REGION}
        onRegionChange={locationChoose ? setRegionLocation : ()=>console.log("CHANGE")}
        // followsUserLocation
        // onPanDrag={onPanDrag}
        customMapStyle={mapStyle}
        
      >
        {location && 
          <Marker
            coordinate={location.coords}
            title={"You"}
            description={"Your current location"}
          />
        }
        {locationChoose && regionLocation && (!pickup || !dropoff) &&
          <Marker
            coordinate={regionLocation}
          />
        }
        { from &&
          <Marker
          coordinate={from}
        />
        }
        { to &&
          <Marker
          coordinate={to}
        />
        }
      </MapView>
      {!modalVisible && 
      <>
        <View style={styles.top}>
          <Text style={styles.greetingText}>Hello, {user?.fullname }</Text>
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
      />
    </View>
  );
}

