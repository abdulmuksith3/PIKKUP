import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigatorDriver from './DrawerNavigatorDriver';
import DriverStack from './DriverStack';
import RiderStack from './RiderStack';

export default function AppContainer(props) { 
  const {userType} = props;
  return (
    <NavigationContainer>
      {userType === "Driver" ?
        <DriverStack/>
        :
        <RiderStack/>
      }
    </NavigationContainer>
  );
}
