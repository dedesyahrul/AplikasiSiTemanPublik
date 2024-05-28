import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Menu from './Menu';
import WhatsappButton from './WhatsappButton';

export default function HomeScreen() {
  return (
    <View>
      {/* Header */}
      <Header />
      <View style={{padding: 20}}>
        {/* Slider */}
        <Slider />
        {/* Menu */}
        <Menu />
        {/* WhatsappButton */}
        <View style={{padding: 30, marginTop: 30}}>
          <WhatsappButton />
        </View>
      </View>
    </View>
  );
}
