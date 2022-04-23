import React from 'react';
import { View, Text, Image} from 'react-native';
import ButtonNext from '../../../common/components/ButtonNext';
import { styles } from './Styles';
import Car from '../../../assets/images/car.png'

export default function WelcomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.titleText}>PIKKUP</Text>
      </View>
      <View style={styles.containerCenter}>
        <ButtonNext 
          onPress={()=>navigation.navigate("LoginScreen")}
        />
      </View>
      <View style={styles.containerBottom}>
        <Image source={Car} style={styles.carImage} />
      </View>
    </View>
  );
}
