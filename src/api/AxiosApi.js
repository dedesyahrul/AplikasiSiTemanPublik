import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.99.82/stp/api';
const IMAGES_ENDPOINT = '/images';

const AxiosApi = () => {
  const [dataImages, setDataImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${IMAGES_ENDPOINT}`);
        setDataImages(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {dataImages.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Text>ID: {item.id}</Text>
          <Text>User ID: {item.user_id}</Text>
          {/* Tampilkan gambar */}
          <Image
            source={{
              uri: `http://192.168.99.82/stp/public/file/imageslider/${item.image}`,
            }}
            style={styles.image}
          />

          {/* Tambahkan teks lainnya sesuai kebutuhan */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AxiosApi;
