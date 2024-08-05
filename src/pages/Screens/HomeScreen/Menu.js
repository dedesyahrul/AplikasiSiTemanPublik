import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Heading from '../../Components/Heading';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const menuItems = [
    {
      id: '1',
      title: 'DATUN',
      image: require('../../../assets/images/icon/datun.png'),
    },
    {
      id: '2',
      title: 'PIDUM',
      image: require('../../../assets/images/icon/pidum.png'),
    },
    {
      id: '3',
      title: 'PIDSUS',
      image: require('../../../assets/images/icon/pidsus.png'),
    },
    {
      id: '4',
      title: 'PB3R',
      image: require('../../../assets/images/icon/pb3r.png'),
    },
    {
      id: '5',
      title: 'INTELIJEN',
      image: require('../../../assets/images/icon/intelijen.png'),
    },
    {
      id: '6',
      title: 'PEMBINAAN',
      image: require('../../../assets/images/icon/pembinaan.png'),
    },
  ];

  const handleMenuPress = itemId => {
    switch (itemId) {
      case '1':
        console.log('Menu Datun pressed');
        navigation.navigate('Datun');
        break;
      case '2':
        console.log('Menu Pidum pressed');
        navigation.navigate('pidum-screen');
        break;
      case '3':
        console.log('Menu Pidsus pressed');
        navigation.navigate('pidsus-screen');
        break;
      case '4':
        console.log('Menu PB3R pressed');
        navigation.navigate('pb3r-screen');
        break;
      case '5':
        console.log('Menu Intelijen pressed');
        navigation.navigate('intelijen-screen');
        break;
      case '6':
        console.log('Menu Pembinaan pressed');
        navigation.navigate('pembinaan-screen');
        break;
      default:
        break;
    }
  };

  const screenWidth = Dimensions.get('window').width;

  const itemWidth = (screenWidth - 100) / 3;

  return (
    <View style={styles.container}>
      <Heading text={'Pelayanan'} />
      <View style={styles.gridContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, {width: itemWidth}]}
            onPress={() => handleMenuPress(item.id)}>
            <Image source={item.image} style={styles.menuImage} />
            <Text style={styles.menuTitle} allowFontScaling={false}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  menuItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  menuImage: {
    width: 70,
    height: 70,
    aspectRatio: 1,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 3,
  },
  menuTitle: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
  },
});

export default Menu;
