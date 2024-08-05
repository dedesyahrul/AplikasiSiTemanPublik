import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {fetchSuratKuasa} from '../../../api/ApiService';
import HeaderForm from './HeaderForm';
import FormTidak from './FormTidak';
import Colors from '../../../utils/Colors';

const ViewFormTidak = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const data = await fetchSuratKuasa();
        if (data.length > 0) {
          const filePath = data[0].file_path;
          setFileUrl(`https://stp.kejaritanjabtim.com/public/${filePath}`);
          setFileName(data[0].file_name);
        }
      } catch (error) {
        console.error('Error fetching the file URL:', error);
      }
    };

    fetchFileUrl();
  }, []);

  const downloadFile = async () => {
    if (!fileUrl) {
      Alert.alert('Error', 'URL file tidak tersedia');
      return;
    }

    const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    try {
      // Memeriksa apakah file sudah ada
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) {
        Alert.alert(
          'File sudah ada',
          `File ${fileName} sudah ada di direktori download.`,
        );
        return;
      }

      const options = {
        fromUrl: fileUrl,
        toFile: downloadDest,
        background: true,
      };

      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          if (res.statusCode === 200) {
            Alert.alert(
              'Sukses',
              `File berhasil diDownload dan disimpan di: ${downloadDest}`,
            );
          } else {
            Alert.alert('Error', 'Gagal Download file');
          }
        })
        .catch(err => {
          console.error('Error in downloading file:', err);
          Alert.alert('Error', 'Gagal Download file');
        });
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'Gagal Download file');
    }
  };

  return (
    <ScrollView>
      <HeaderForm />
      <View>
        <FormTidak />
      </View>
      <View
        style={{
          borderWidth: 0.4,
          borderColor: Colors.secondary,
          marginRight: 20,
          marginLeft: 20,
        }}
      />
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={downloadFile}>
          <Text
            style={{
              fontFamily: 'Outfit-SemiBold',
              color: Colors.primary,
              fontSize: 15,
              textDecorationLine: 'underline',
            }}
            allowFontScaling={false}>
            Silahkan Download Form Surat Kuasa disini
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewFormTidak;
