import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HeaderPb3r = ({onSearch}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/devq.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
            <Text style={styles.headerTitle} allowFontScaling={false}>
              PB3R
            </Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle} allowFontScaling={false}>
              Pengembalian Barang Bukti
            </Text>
            <Text style={styles.subtitle} allowFontScaling={false}>
              Lacak Status Barang Bukti disini
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cari Nama Terpidana/No. Putusan Perkara"
              placeholderTextColor={Colors.secondary}
              onChangeText={onSearch}
              allowFontScaling={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.light,
    fontSize: 24,
    fontFamily: 'Outfit-SemiBold',
    marginLeft: 10,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: Colors.light,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: Colors.light,
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    elevation: 3,
  },
  input: {
    padding: 12,
    fontSize: 15,
    color: Colors.dark,
    borderRadius: 25,
  },
});

export default HeaderPb3r;
