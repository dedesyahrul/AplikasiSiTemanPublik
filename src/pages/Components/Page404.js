import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import NotFoundImage from '../../assets/images/404-img.png';

const Page404 = () => {
  return (
    <View style={styles.container}>
      <Image source={NotFoundImage} style={styles.image} />
      <Text style={styles.text} allowFontScaling={false}>
        Oops! The page you are looking for does not exist.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Outfit-Regular',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Page404;
