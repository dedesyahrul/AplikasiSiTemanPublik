import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Linking} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../utils/Colors'; // Pastikan path menuju Colors sudah sesuai

const WhatsappButton = () => {
  const handlePress = () => {
    const url = 'whatsapp://send?phone=6281248292233';
    Linking.openURL(url).catch(() => {
      console.log('WhatsApp tidak terinstall pada perangkat ini');
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
      <View style={styles.buttonContent}>
        <Icons name="whatsapp" size={30} style={styles.icon} />
        <Text style={styles.buttonText} allowFontScaling={false}>
          Hubungi Kami via WhatsApp
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary, // Menggunakan warna primer dari file Colors
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#25D366', // Warna ikon WhatsApp
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'Outfit-Medium',
  },
});

export default WhatsappButton; // Ekspor komponen WhatsappButton untuk digunakan di tempat lain
