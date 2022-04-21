import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import DrawerComp from '../common/components/DrawerComp';
import HomeScreenDriver from '../screens/app/home-driver/HomeScreenDriver';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
  drawerType:'front'
}

export default function DrawerNavigatorDriver() { 
  return (
      <Drawer.Navigator 
        initialRouteName="Home" 
        screenOptions={screenOptions}
        // drawerContent={(props) => <DrawerComp {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreenDriver} />
      </Drawer.Navigator>
  );
}