import React, {useEffect, useState, useContext, useRef} from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from './Styles'
import { UserContext } from '../../../App';
import db from '../../../db';
import firebase from 'firebase';
import { logout } from '../../../common/functions/Authentication';
import { Icon } from 'react-native-elements';
import { color } from '../../../common/theme/color';
import Avatar2 from '../../../assets/images/avatar2.png'
import { getBookingHistory } from '../../../common/functions/Booking';
const { width, height } = Dimensions.get('window');


export default function ProfileScreen({navigation}) {
  const {state, dispatch} = useContext(UserContext);
  const {user} = state;
  const [bookingHistory, setBookingHistory] = useState(null);

  useEffect(() => {
    if(user.bookingHistory){
      handleBookingHistory()
    }
  }, [user]);

  const handleBookingHistory = async () => {
    const history = await getBookingHistory(user.bookingHistory);
    if(history.length > 0){
      setBookingHistory(history)
    } else {
      setBookingHistory(null)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.topHeader}>
          <Icon
            name={'chevron-left'}
            size={24}
            color={color.WHITE_PRIMARY}
            type={"feather"}
            onPress={()=> navigation.goBack()}
          />
          <Text onPress={()=> logout()} style={styles.logoutText}>Logout</Text>
        </View>
        <View style={styles.topBody}>
          <Image source={Avatar2} style={styles.userImg} />
          <Text style={styles.nameText}>{user?.fullname}</Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.titleText}>Booking History</Text>
        <ScrollView style={styles.scrollView}>
          {bookingHistory?.map( (item, index) => 
          <TouchableOpacity disabled key={index} style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Icon
                name={'map'}
                size={30}
                color={color.WHITE_PRIMARY}
                type={"feather"}
              />
            </View>
            <View>
              <Text style={styles.optionText}>Pick Up - {item?.pickup}</Text>
              <Text style={styles.optionText}>Drop Off - {item?.dropoff}</Text>
            </View>
          </TouchableOpacity>
          )} 
        </ScrollView>
      </View>
    </View>
  );
}



