import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenDriver from '../screens/app/home-driver/HomeScreenDriver';
import ProfileScreen from '../screens/app/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function DriverStack(props) { 
  return (
    <Stack.Navigator 
    initialRouteName={"HomeScreenDriver"}
    screenOptions={{
        headerShown: false,
    }}
    >
      <Stack.Screen name="HomeScreenDriver" component={HomeScreenDriver} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
    </Stack.Navigator>
  );
  }