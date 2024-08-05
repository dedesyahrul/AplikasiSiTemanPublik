import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HeaderDatun = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
        <Text
          style={{
            color: Colors.light,
            fontSize: 24,
            fontFamily: 'Outfit-SemiBold',
          }}
          allowFontScaling={false}>
          DATUN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});

export default HeaderDatun;
