import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigatorDriver from './DrawerNavigatorDriver';

export default function AppContainer(props) { 
  const {userType} = props;
  return (
    <NavigationContainer>
      {userType === "Driver" ?
        <DrawerNavigatorDriver/>
        :
        <DrawerNavigator/>
      }
    </NavigationContainer>
  );
}
