import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Banner = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/dev.png')}
      style={styles.imageBackground}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>Si Teman Publik</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Menambahkan lapisan gelap transparan di atas gambar
  },
  appName: {
    fontSize: 24,
    color: 'white',
    marginTop: 20,
    fontFamily: 'Outfit-Bold',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Banner;
