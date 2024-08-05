import React, {useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeBlobUtil from 'react-native-blob-util';

const PdfModal = ({visible, onClose, petikanPutusan}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const source = {
    uri: `https://stp.kejaritanjabtim.com/public/files/petikanputusan/${petikanPutusan}`,
    cache: true,
  };

  const downloadFile = async () => {
    try {
      const res = await ReactNativeBlobUtil.config({
        trusty: true, // Menggunakan trust manager bawaan
      }).fetch('GET', source.uri);

      console.log('File downloaded to:', res.path());
    } catch (error) {
      console.error('Download error:', error);
      setError(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={30} color={Colors.dark} />
            </TouchableOpacity>
          </View>
          {loading && !error && (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
          {error && (
            <Text style={styles.errorText}>
              Failed to load PDF: {error.message}
            </Text>
          )}
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              setLoading(false);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
              setError(error);
              setLoading(false);
            }}
            style={styles.pdf}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.6,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default PdfModal;
