import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import HeaderForm from './HeaderForm';
import FormYa from './FormYa';

const ViewFormYa = () => {
  return (
    <ScrollView>
      <HeaderForm />
      <View>
        <FormYa />
      </View>
    </ScrollView>
  );
};

export default ViewFormYa;
