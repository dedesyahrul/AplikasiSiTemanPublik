import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Pdf from 'react-native-pdf';
import Colors from '../../../utils/Colors';

const ViewPdf = ({route}) => {
  const {petikanPutusan} = route.params;
  const source = {
    uri: `https://stp.kejaritanjabtim.com/public/files/petikanputusan/${petikanPutusan}`,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
        renderActivityIndicator={() => (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ViewPdf;
