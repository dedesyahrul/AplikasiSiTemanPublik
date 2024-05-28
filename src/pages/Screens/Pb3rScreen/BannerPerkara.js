import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const BannerPerkara = ({namaTersangka, nomorPutusan, tanggalPutusan}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/detuserq.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={styles.content}>
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
            }}>
            Detail Perkara
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}} />
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/images/userq.png')}
            style={styles.image}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Outfit-Bold',
                color: Colors.light,
              }}>
              {namaTersangka}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Outfit-Regular',
                color: Colors.light,
              }}>
              No. Putusan Perkara : {nomorPutusan}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Outfit-Regular',
                color: Colors.light,
              }}>
              Tanggal Putusan : {tanggalPutusan}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden', // Menggunakan overflow: 'hidden' untuk memastikan konten tidak melampaui batas-batas border radius
  },
  backgroundImage: {
    width: '100%',
    height: 200, // Ubah sesuai dengan tinggi gambar Anda
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'transparent', // Transparent background to allow overlay to show
  },
  profileContainer: {
    padding: 10,
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
});

export default BannerPerkara;
