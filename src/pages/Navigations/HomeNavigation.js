import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import Menu from '../Screens/HomeScreen/Menu';
import DatunScreen from '../Screens/DatunScreen';
import Pb3rScreen from '../Screens/Pb3rScreen';
import DetailPerkara from '../Screens/Pb3rScreen/DetailPerkara';
import FormYa from '../Screens/Pb3rScreen/FormYa';
import FormTidak from '../Screens/Pb3rScreen/FormTidak';
import ViewFormYa from '../Screens/Pb3rScreen/ViewFormYa';
import ViewFormTidak from '../Screens/Pb3rScreen/ViewFormTidak';
import ViewBantuanHukum from '../Screens/DatunScreen/ViewBantuanHukum';
import ViewPelayananHukum from '../Screens/DatunScreen/ViewPelayananHukum';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="Datun" component={DatunScreen} />
      <Stack.Screen name="pb3r-screen" component={Pb3rScreen} />
      <Stack.Screen name="DetailPerkara" component={DetailPerkara} />
      <Stack.Screen name="FormYa" component={FormYa} />
      <Stack.Screen name="FormTidak" component={FormTidak} />
      <Stack.Screen name="ViewFormYa" component={ViewFormYa} />
      <Stack.Screen name="ViewFormTidak" component={ViewFormTidak} />
      <Stack.Screen name="pel-hukum" component={ViewPelayananHukum} />
      <Stack.Screen name="ban-hukum" component={ViewBantuanHukum} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
