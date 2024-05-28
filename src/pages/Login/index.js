import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import {StatusBar} from 'expo-status-bar';

const Login = ({onPress}) => {
  return (
    <>
      <StatusBar style="auto" />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/logo-kejari.png')}
          style={styles.logoKejari}
        />
        <Image
          source={require('../../assets/images/logo-stp-02.png')}
          style={styles.logoKejari}
        />
        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 21,
              color: Colors.dark,
              textAlign: 'center',
              fontFamily: 'Outfit-Regular',
            }}>
            Pelayanan yang Lebih Mudah, Transparan, dan Andal bagi Masyarakat.
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.dark,
              textAlign: 'center',
              fontFamily: 'Outfit-Regular',
            }}>
            Bersama-sama, mari kita ciptakan pengalaman pelayanan yang memuaskan
            dan berkesan bagi semua!
          </Text>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontFamily: 'Outfit-Regular',
                color: Colors.light,
              }}>
              Beranda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoKejari: {
    marginTop: 50,
    marginBottom: 20,
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.warning,
    height: '70%',
    marginTop: -10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop: 30,
  },
});

export default Login;
