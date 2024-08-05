import React from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({route}) => {
  const {localUrl} = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: localUrl}}
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
    width: '100%',
    height: '100%',
  },
});

export default PdfViewer;
