import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 70) / 2;

const PertimbanganHukumMenu = () => {
  const navigation = useNavigation();
  const menuItems = [
    {
      id: '1',
      name: 'Pendampingan Hukum',
      image: require('../../../assets/images/icon/penkum-01.png'),
    },
    {
      id: '2',
      name: 'Pendapat Hukum',
      image: require('../../../assets/images/icon/dapatkum-01.png'),
    },
    {
      id: '3',
      name: 'Audit Hukum',
      image: require('../../../assets/images/icon/ditkum-01.png'),
    },
  ];

  const handlePress = itemId => {
    switch (itemId) {
      case '1':
        console.log('Menu Pendampingan Hukum pressed');
        navigation.navigate('per-hukum-lain');
        break;
      case '2':
        console.log('Menu Pendapat Hukum pressed');
        navigation.navigate('per-hukum-lain');
        break;
      case '3':
        console.log('Menu Audit Hukum pressed');
        navigation.navigate('per-hukum-lain');
        break;
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={styles.item}>
        <Image source={item.image} />
        <Text style={styles.title} allowFontScaling={false}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Set number of columns for grid
        columnWrapperStyle={styles.row} // Apply styles to each row
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.primary,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    backgroundColor: Colors.light,
    borderRadius: 15,
    width: ITEM_WIDTH,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    color: Colors.dark,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default PertimbanganHukumMenu;
