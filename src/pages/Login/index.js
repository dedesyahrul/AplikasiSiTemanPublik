import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../utils/Colors';
import {StatusBar} from 'expo-status-bar';
import VersionCheck from 'react-native-version-check';

const Login = ({onPress}) => {
  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const latestVersion = await VersionCheck.getLatestVersion({
        provider: 'playStore', // atau 'appStore' untuk iOS
      });

      const currentVersion = VersionCheck.getCurrentVersion();

      if (VersionCheck.needUpdate({currentVersion, latestVersion}).isNeeded) {
        Alert.alert(
          'Update Available',
          'Versi baru dari aplikasi tersedia. Silakan perbarui ke versi terbaru.',
          [
            {
              text: 'Update',
              onPress: () =>
                VersionCheck.getStoreUrl({provider: 'playStore'}).then(url =>
                  Linking.openURL(url),
                ),
            },
            {text: 'Cancel', style: 'cancel'},
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error checking for update:', error);
    }
  };

  const translateY = useRef(new Animated.Value(0)).current;
  const [isPulledUp, setIsPulledUp] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (!isPulledUp) {
          translateY.setValue(Math.max(gestureState.dy, -150)); // Batasi gerakan tarik ke atas
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -100) {
          // Jika tarik ke atas lebih dari setengah jalan, tetap di atas
          setIsPulledUp(true);
          Animated.spring(translateY, {
            toValue: -150,
            useNativeDriver: true,
          }).start();
        } else {
          // Jika tidak, kembalikan ke posisi awal
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const animatedStyle = {
    transform: [{translateY: translateY}],
  };

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
        <Animated.View
          style={[styles.subContainer, animatedStyle]}
          {...panResponder.panHandlers}>
          <View style={styles.dragIndicator} />
          <Text style={styles.mainText} allowFontScaling={false}>
            Pelayanan yang Lebih Mudah, Transparan, dan Andal bagi Masyarakat.
          </Text>
          <Text style={styles.subText} allowFontScaling={false}>
            Bersama-sama, mari kita ciptakan pengalaman pelayanan yang memuaskan
            dan berkesan bagi semua!
          </Text>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText} allowFontScaling={false}>
              Beranda
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
  dragIndicator: {
    width: 60,
    height: 5,
    backgroundColor: Colors.dark,
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mainText: {
    fontSize: 21,
    color: Colors.dark,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  subText: {
    fontSize: 15,
    color: Colors.dark,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Outfit-Regular',
    color: Colors.light,
  },
});

export default Login;
