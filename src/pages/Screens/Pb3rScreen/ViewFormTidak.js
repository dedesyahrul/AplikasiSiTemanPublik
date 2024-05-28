import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import HeaderForm from './HeaderForm';
import FormTidak from './FormTidak';
import Colors from '../../../utils/Colors';

const ViewFormTidak = () => {
  return (
    <ScrollView>
      <HeaderForm />
      <View>
        <FormTidak />
      </View>
      <View
        style={{
          borderWidth: 0.4,
          borderColor: Colors.secondary,
          marginRight: 20,
          marginLeft: 20,
        }}
      />
      <View style={{padding: 20}}>
        <Text
          style={{
            fontFamily: 'Outfit-SemiBold',
            color: Colors.dark,
            fontSize: 15,
          }}>
          Silahkan Download Form Surat Kuasa disini
        </Text>
        <Text
          style={{
            fontFamily: 'Outfit-SemiBold',
            color: Colors.primary,
            fontSize: 15,
          }}>
          Form Surat Kuasa
        </Text>
      </View>
    </ScrollView>
  );
};

export default ViewFormTidak;
