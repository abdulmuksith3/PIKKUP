import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/home/HomeScreen';
import ProfileScreen from '../screens/app/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RiderStack(props) { 
  return (
    <Stack.Navigator 
    initialRouteName={"HomeScreen"}
    screenOptions={{
        headerShown: false,
    }}
    >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
    </Stack.Navigator>
  );
  }