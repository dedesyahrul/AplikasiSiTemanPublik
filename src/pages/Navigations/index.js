import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/HomeScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import Abouts from '../Screens/Abouts';
import Colors from '../../utils/Colors';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function Navigations() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{color: color, fontSize: 12, marginTop: -7}}
              allowFontScaling={false}>
              Beranda
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>
              Pengaturan
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icons name="cog" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Abouts"
        component={Abouts}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              style={{color: color, fontSize: 12, marginTop: -7}}
              allowFontScaling={false}>
              Tentang
            </Text>
          ),
          tabBarIcon: ({color, size}) => (
            <Icons name="info" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
