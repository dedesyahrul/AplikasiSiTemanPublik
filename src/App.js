import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import Navigations from './pages/Navigations';
import Login from './pages/Login';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  const handleContinuePress = () => {
    setIsContinuePressed(true);
  };

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const timer = setTimeout(() => {
        SplashScreen.hide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <View style={styles.container}>
      {!isContinuePressed && <Login onPress={handleContinuePress} />}
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
  },
});

export default App;
