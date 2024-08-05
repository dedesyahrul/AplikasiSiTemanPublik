import {View, StyleSheet} from 'react-native';
import React from 'react';
import Page404 from '../../Components/Page404';

const IntelijenScreen = () => {
  return (
    <View style={styles.container}>
      <Page404 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IntelijenScreen;
