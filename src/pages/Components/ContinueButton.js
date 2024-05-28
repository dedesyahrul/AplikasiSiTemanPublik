import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const ContinueButton = ({onPress}) => {
  return (
    <>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContinueButton;
