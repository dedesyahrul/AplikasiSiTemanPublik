import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Heading from '../../Components/Heading';
import {fetchImages} from '../../../api/ApiService';

const {width} = Dimensions.get('window');
const SLIDE_WIDTH = 270;
const SLIDE_INTERVAL = 3000;

const Slider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesData = await fetchImages();
        // Duplicate the images to create an infinite loop effect
        setImages([...imagesData, ...imagesData]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current += 1;
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: currentIndexRef.current * SLIDE_WIDTH,
          animated: true,
        });
      }
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [images]);

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.floor(contentOffset.x / SLIDE_WIDTH);

    if (index >= images.length / 2) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false,
      });
      currentIndexRef.current = 0;
    }
  };

  const renderItem = ({item}) => (
    <View style={{marginRight: 20}}>
      <Image
        source={{
          uri: `https://stp.kejaritanjabtim.com/public/file/imageslider/${item.image}`,
        }}
        style={styles.image}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text allowFontScaling={false}>Memuat...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Heading text={'Informasi'} />
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: SLIDE_WIDTH,
          offset: SLIDE_WIDTH * index,
          index,
        })}
        initialScrollIndex={0}
        initialNumToRender={5} // Render 5 items initially
        windowSize={5} // Set windowSize to a realistic value
        removeClippedSubviews={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SLIDE_WIDTH,
    height: 150,
    borderRadius: 10,
  },
});

export default Slider;
