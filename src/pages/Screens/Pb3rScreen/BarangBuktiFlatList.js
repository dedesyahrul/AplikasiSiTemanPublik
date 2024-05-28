import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import Colors from '../../../utils/Colors';
import Heading from '../../Components/Heading';
import {useNavigation} from '@react-navigation/native';

const BarangBuktiFlatList = ({perkara}) => {
  const [checkedItems, setCheckedItems] = useState({});
  const navigation = useNavigation();

  const handleCheck = (itemId, value) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const handleDownload = async path => {
    try {
      const baseUrl = 'https://stp.kejaritanjabtim.com/public/';
      const url = `${baseUrl}${path}`;
      const fileName = path.split('/').pop();
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
        background: true,
        discretionary: true,
        progress: res => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Downloading: ${progress}%`);
        },
      });

      const result = await download.promise;
      if (result.statusCode == 200) {
        Alert.alert(
          'Download completed',
          `File downloaded to: ${downloadDest}`,
        );
      } else {
        Alert.alert('Download failed', 'Failed to download the file');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Download failed', 'Failed to download the file');
    }
  };

  return (
    <View style={styles.content}>
      <Heading text={'Daftar Barang Bukti'} />
      <FlatList
        data={perkara.barang_bukti}
        renderItem={({item}) => (
          <View key={item.id} style={styles.container}>
            <Image
              source={{
                uri: `https://stp.kejaritanjabtim.com/public/foto_barang_bukti/${item.foto_barang_bukti}`,
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text
                style={{
                  fontFamily: 'Outfit-Regular',
                  color: Colors.secondary,
                  fontSize: 12,
                }}>
                Barang Bukti
              </Text>
              <Text style={styles.itemTitle}>{item.barang_bukti}</Text>
              <Text style={styles.itemSubtitle}>
                Pemilik: {item.nama_pemilik_barang_bukti}
              </Text>
              <Text style={styles.itemSubtitle}>
                Lokasi: {item.lokasi_barang_bukti}
              </Text>
              {item.status === 'Proses' ? (
                <Text style={styles.itemSubtitle}>
                  Status: <Text style={styles.statusProses}>{item.status}</Text>
                </Text>
              ) : item.status === 'Selesai' ? (
                <>
                  <Text style={styles.itemSubtitle}>
                    Status:{' '}
                    <Text style={styles.statusAmbil}>Sudah di Ambil</Text>
                  </Text>
                  <Text
                    style={styles.downloadLink}
                    onPress={() => handleDownload(item.ba_serah_terima)}>
                    Download Berita Acara Serah Terima
                  </Text>
                  <Text
                    style={styles.downloadLink}
                    onPress={() => handleDownload(item.d_serah_terima)}>
                    Download Dokumentasi Serah Terima
                  </Text>
                </>
              ) : (
                <>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderColor: Colors.secondary,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                  <Text style={styles.itemSubtitle}>
                    Apakah Anda Pemilik Barang Bukti?
                  </Text>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        checkedItems[item.id] === 'ya' &&
                          styles.checkedCheckbox,
                      ]}
                      onPress={() => handleCheck(item.id, 'ya')}>
                      <Text
                        style={[
                          styles.checkboxText,
                          checkedItems[item.id] === 'ya' &&
                            styles.checkedCheckboxText,
                        ]}>
                        Ya
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        checkedItems[item.id] === 'tidak' &&
                          styles.checkedCheckbox,
                      ]}
                      onPress={() => handleCheck(item.id, 'tidak')}>
                      <Text
                        style={[
                          styles.checkboxText,
                          checkedItems[item.id] === 'tidak' &&
                            styles.checkedCheckboxText,
                        ]}>
                        Tidak
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      !checkedItems[item.id] && styles.buttonDisabled,
                    ]}
                    onPress={() => {
                      if (checkedItems[item.id] === 'ya') {
                        navigation.navigate('ViewFormYa', {
                          itemId: item.id,
                          perkara,
                        });
                      } else if (checkedItems[item.id] === 'tidak') {
                        navigation.navigate('ViewFormTidak', {itemId: item.id});
                      }
                    }}
                    disabled={!checkedItems[item.id]}>
                    <Text style={styles.buttonText}>Ambil</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  content: {
    padding: 20,
  },
  infoContainer: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: Colors.dark,
    fontSize: 19,
  },
  itemSubtitle: {
    fontFamily: 'Outfit-Medium',
    color: Colors.dark,
    fontSize: 15,
  },
  statusAmbil: {
    color: Colors.success,
  },
  statusProses: {
    color: Colors.danger,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: Colors.light,
  },
  checkedCheckbox: {
    backgroundColor: Colors.primary,
  },
  checkboxText: {
    color: Colors.dark,
    fontFamily: 'Outfit-Medium',
  },
  checkedCheckboxText: {
    color: Colors.light,
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.light,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 14,
  },
  downloadLink: {
    marginTop: 10,
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontFamily: 'Outfit-SemiBold',
    fontSize: 14,
  },
});

export default BarangBuktiFlatList;
