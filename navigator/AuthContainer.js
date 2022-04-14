import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/welcome/WelcomeScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';

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
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }