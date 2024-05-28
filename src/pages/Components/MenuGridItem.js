import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MenuGridItem = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '20%', // Menggunakan persentase lebar untuk memastikan item grid sesuai di layar
    aspectRatio: 1, // Menggunakan aspect ratio untuk memastikan item grid memiliki aspek rasio yang sama
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default MenuGridItem;
