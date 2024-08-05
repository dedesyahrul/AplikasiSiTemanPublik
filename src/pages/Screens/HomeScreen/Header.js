import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Colors from '../../../utils/Colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/logo-kejari.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 20,
              fontFamily: 'Outfit-Regular',
            }}
            allowFontScaling={false}>
            Selamat Datang,
          </Text>
          <Text
            style={{
              color: Colors.light,
              fontSize: 15,
              fontFamily: 'Outfit-Regular',
            }}
            allowFontScaling={false}>
            Kejari Tanjung Jabung Timur
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  textContainer: {
    marginLeft: 10,
  },
});
