import {View, Text} from 'react-native';
import React from 'react';
import DatunMenu from './DatunMenu';
import HeaderDatun from './HeaderDatun';
import WhatsappButton from '../HomeScreen/WhatsappButton';

const DatunScreen = () => {
  return (
    <View>
      <HeaderDatun />
      <View style={{padding: 10}}>
        <DatunMenu />

        <View style={{padding: 30}}>
          <WhatsappButton />
        </View>
      </View>
    </View>
  );
};

export default DatunScreen;
