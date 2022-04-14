import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/welcome/WelcomeScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';


const Stack = createNativeStackNavigator();

export default function AuthContainer(props) { 
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={"WelcomeScreen"}
        screenOptions={{
            headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }