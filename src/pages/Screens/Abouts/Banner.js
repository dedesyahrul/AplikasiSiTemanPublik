import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';

const Banner = () => {
  const handleContactUsPress = () => {
    const instagramUrl = 'https://www.instagram.com/dedesyahh/';
    Linking.openURL(instagramUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/dev.png')}
      style={styles.imageBackground}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={handleContactUsPress}>
          <Text style={styles.buttonText} allowFontScaling={false}>
            Contact Us
          </Text>
        </TouchableOpacity>
        <Text style={styles.appName} allowFontScaling={false}>
          Si Teman Publik
        </Text>
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
