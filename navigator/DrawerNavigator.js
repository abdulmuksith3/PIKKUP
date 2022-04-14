import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import DrawerComp from '../common/components/DrawerComp';
import HomeScreen from '../screens/app/home/HomeScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
  drawerType:'front'
}

export default function DrawerNavigator() { 
  return (
      <Drawer.Navigator 
        initialRouteName="Home" 
        screenOptions={screenOptions}
        // drawerContent={(props) => <DrawerComp {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
  );
}