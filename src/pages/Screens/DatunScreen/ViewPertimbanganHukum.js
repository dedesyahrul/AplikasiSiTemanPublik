import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import PertimbanganHukumMenu from './PertimbanganHukumMenu';

const ViewPertimbanganHukum = () => {
  const navigation = useNavigation();
  return (
    <View>
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
            Pertimbangan Hukum
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <PertimbanganHukumMenu />
      </View>
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

export default ViewPertimbanganHukum;
