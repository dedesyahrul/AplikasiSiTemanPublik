import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = () => {
  useEffect(() => {
    // Menggunakan useEffect untuk menyembunyikan SplashScreen setelah animasi selesai
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Menyembunyikan SplashScreen
    }, 3000); // Durasi animasi splash, disesuaikan dengan kebutuhan Anda

    return () => clearTimeout(timer); // Membersihkan timer saat komponen dilepas
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splash-animation.json')} // Path ke file JSON animasi
        autoPlay
        loop={false} // Animasi tidak diulang
        onAnimationFinish={() => SplashScreen.hide()} // Menyembunyikan SplashScreen ketika animasi selesai
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#143FF0', // Warna latar belakang splash screen
  },
});

export default SplashScreenComponent;
