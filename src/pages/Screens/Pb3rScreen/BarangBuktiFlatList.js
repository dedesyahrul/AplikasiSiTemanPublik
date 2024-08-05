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

      // Memastikan direktori download ada
      const directoryExists = await RNFS.exists(RNFS.DownloadDirectoryPath);
      if (!directoryExists) {
        await RNFS.mkdir(RNFS.DownloadDirectoryPath);
      }

      // Memeriksa apakah file sudah ada
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) {
        Alert.alert(
          'File sudah ada',
          `File ${fileName} sudah ada di direktori download.`,
        );
        return;
      }

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
        background: true,
        discretionary: true,
        progress: res => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Mengunduh: ${progress}%`);
        },
      });

      const result = await download.promise;
      if (result.statusCode === 200) {
        Alert.alert('Download selesai', `File diDownload ke: ${downloadDest}`);
      } else {
        Alert.alert('Download gagal', 'Gagal Download file');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Download gagal', 'Gagal Download file');
    }
  };

  return (
    <View style={styles.content}>
      <Heading text="Daftar Barang Bukti" />
      <FlatList
        data={perkara.barang_bukti}
        renderItem={({item}) => (
          <View key={item.id} style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.itemLabel} allowFontScaling={false}>
                Detail Barang Bukti
              </Text>
              <Text style={styles.itemSubtitle} allowFontScaling={false}>
                Pemilik: {item.nama_pemilik_barang_bukti}
              </Text>

              <Text style={styles.itemSubtitle} allowFontScaling={false}>
                Status:{' '}
                {item.status === 'Proses' ? (
                  <Text style={styles.statusProses} allowFontScaling={false}>
                    {item.status}
                  </Text>
                ) : item.status === 'Selesai' ? (
                  <Text style={styles.statusAmbil} allowFontScaling={false}>
                    Sudah di Ambil
                  </Text>
                ) : (
                  <Text style={styles.statusBelum} allowFontScaling={false}>
                    Belum Diambil
                  </Text>
                )}
              </Text>
              {item.status === 'Selesai' && (
                <>
                  <Text
                    style={styles.downloadLink}
                    allowFontScaling={false}
                    onPress={() => handleDownload(item.ba_serah_terima)}>
                    Download Berita Acara Serah Terima
                  </Text>
                  <Text
                    style={styles.downloadLink}
                    allowFontScaling={false}
                    onPress={() => handleDownload(item.d_serah_terima)}>
                    Download Dokumentasi Serah Terima
                  </Text>
                </>
              )}

              <FlatList
                data={item.jenis_barang_bukti}
                renderItem={({item}) => (
                  <View key={item.id} style={styles.jenisContainer}>
                    <Image
                      source={{
                        uri: `https://stp.kejaritanjabtim.com/public/foto_barang_bukti/${item.foto_barang_bukti}`,
                      }}
                      style={styles.jenisImage}
                    />
                    <View style={styles.jenisInfoContainer}>
                      <Text style={styles.jenisLabel} allowFontScaling={false}>
                        Barang Bukti
                      </Text>
                      <Text style={styles.jenisTitle} allowFontScaling={false}>
                        {item.barang_bukti}
                      </Text>
                      <Text
                        style={styles.jenisSubtitle}
                        allowFontScaling={false}>
                        Lokasi: {item.lokasi_barang_bukti}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />

              {item.status !== 'Proses' && item.status !== 'Selesai' && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.itemSubtitle} allowFontScaling={false}>
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
                        ]}
                        allowFontScaling={false}>
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
                        ]}
                        allowFontScaling={false}>
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
                    <Text style={styles.buttonText} allowFontScaling={false}>
                      Ambil
                    </Text>
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
  content: {
    padding: 20,
  },
  container: {
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: 'Outfit-Regular',
    color: Colors.secondary,
    fontSize: 12,
  },
  itemTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: Colors.dark,
    fontSize: 19,
    marginBottom: 5,
  },
  itemSubtitle: {
    fontFamily: 'Outfit-SemiBold',
    color: Colors.dark,
    fontSize: 16,
  },
  statusAmbil: {
    color: Colors.success,
  },
  statusProses: {
    color: Colors.primary,
  },
  statusBelum: {
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  jenisContainer: {
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    gap: 10,
    elevation: 1,
  },
  jenisImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  jenisInfoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  jenisLabel: {
    fontFamily: 'Outfit-Regular',
    color: Colors.secondary,
    fontSize: 12,
  },
  jenisTitle: {
    fontFamily: 'Outfit-SemiBold',
    color: Colors.dark,
    fontSize: 15,
    marginBottom: 5,
  },
  jenisSubtitle: {
    fontFamily: 'Outfit-Regular',
    color: Colors.secondary,
    fontSize: 14,
  },
  divider: {
    borderWidth: 0.4,
    borderColor: Colors.secondary,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default BarangBuktiFlatList;
