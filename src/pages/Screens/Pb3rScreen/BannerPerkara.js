import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const BannerPerkara = ({namaTersangka, petikanPutusan}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigation = useNavigation();

  const maxRetries = 3;

  const handleViewPDF = () => {
    const baseUrl =
      'https://stp.kejaritanjabtim.com/public/files/petikanputusan/';
    const url = `${baseUrl}${encodeURIComponent(
      petikanPutusan,
    )}?t=${new Date().getTime()}`;
    const googleDocsUrl = `https://docs.google.com/viewer?url=${url}&embedded=true`;
    console.log('Google Docs Viewer URL:', googleDocsUrl);
    setPdfUri(googleDocsUrl);
    setModalVisible(true);
    setLoading(true);
    setError(false);
    setRetryCount(0); // Reset retry count
  };

  const handleDownloadPDF = async () => {
    const baseUrl =
      'https://stp.kejaritanjabtim.com/public/files/petikanputusan/';
    const url = `${baseUrl}${encodeURIComponent(petikanPutusan)}`;
    console.log('Downloading PDF from URL:', url);

    try {
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${encodeURIComponent(
        petikanPutusan,
      )}`;

      // Periksa apakah file sudah ada
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) {
        Alert.alert(
          'File Already Exists',
          `The file already exists at: ${downloadDest}`,
        );
        return;
      }

      const options = {
        fromUrl: url,
        toFile: downloadDest,
      };
      await RNFS.downloadFile(options).promise;
      Alert.alert('Success', `PDF downloaded to: ${downloadDest}`);
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download PDF');
    }
  };

  const handleRefreshPDF = () => {
    setError(false);
    setLoading(true);
    setRetryCount(0); // Reset retry count
    setPdfUri(
      prevUri =>
        `${prevUri.split('&refresh=')[0]}&refresh=${new Date().getTime()}`,
    );
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      setError(false);
      setLoading(true);
      setPdfUri(
        prevUri =>
          `${prevUri.split('&retry=')[0]}&retry=${new Date().getTime()}`,
      );
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/detuserq.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
          <Text style={styles.headerText} allowFontScaling={false}>
            Detail Perkara
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}} />
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/images/userq.png')}
            style={styles.image}
          />
          <View>
            <TouchableOpacity
              onPress={handleViewPDF}
              style={styles.badgeButton}>
              <Text style={styles.viewFileText} allowFontScaling={false}>
                Lihat Petikan Putusan
              </Text>
            </TouchableOpacity>
            <Text style={styles.profileName} allowFontScaling={false}>
              {namaTersangka}
            </Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-outline" size={30} color="black" />
            </TouchableOpacity>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text allowFontScaling={false}>Loading...</Text>
              </View>
            )}
            {pdfUri && !error && (
              <WebView
                source={{uri: pdfUri}}
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                onLoadEnd={() => setLoading(false)}
                onError={syntheticEvent => {
                  const {nativeEvent} = syntheticEvent;
                  console.warn('WebView error: ', nativeEvent);
                  setLoading(false);
                  handleRetry();
                }}
              />
            )}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText} allowFontScaling={false}>
                  Failed to load PDF.
                </Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={handleRefreshPDF}>
                  <Text
                    style={styles.refreshButtonText}
                    allowFontScaling={false}>
                    Refresh
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownloadPDF}>
              <Text style={styles.downloadButtonText} allowFontScaling={false}>
                Download Petikan Putusan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'transparent',
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light,
    fontSize: 24,
    fontFamily: 'Outfit-SemiBold',
  },
  profileContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: Colors.light,
    paddingRight: 50,
    marginTop: 5,
  },
  badgeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 170,
  },
  viewFileText: {
    fontSize: 15,
    fontFamily: 'Outfit-Regular',
    color: Colors.light,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  refreshButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
  },
  downloadButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
});

export default BannerPerkara;
