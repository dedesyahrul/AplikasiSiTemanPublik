import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import Navigations from './pages/Navigations';
import ContinueButton from './pages/Components/ContinueButton'; // Impor komponen ContinueButton
import Login from './pages/Login';

const App = () => {
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  // Fungsi untuk menangani ketika tombol "Continue" ditekan
  const handleContinuePress = () => {
    // Set isContinuePressed menjadi true
    setIsContinuePressed(true);
  };

  return (
    <View style={styles.container}>
      {/* Jika tombol "Continue" belum ditekan, tampilkan tombol "Continue" */}
      {!isContinuePressed && <Login onPress={handleContinuePress} />}

      {/* Jika tombol "Continue" sudah ditekan, tampilkan halaman navigasi */}
      {isContinuePressed && (
        <>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#143FF0',
    // paddingTop: 20,
  },
});

export default App;
