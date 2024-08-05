import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderPb3r from './HeaderPb3r';
import Colors from '../../../utils/Colors';
import {fetchDataPerkara} from '../../../api/ApiService';

const SearchFeature = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchText !== '' && searchText.length >= 4) {
          setLoading(true); // Set loading to true before fetching data
          const result = await fetchDataPerkara('GET');
          const filteredResult = result.filter(
            item =>
              item.nama_tersangka
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              item.no_putusan_perkara
                .toLowerCase()
                .includes(searchText.toLowerCase()),
          );
          setSearchResult(filteredResult);
          setLoading(false); // Set loading to false after data is fetched
        } else {
          setSearchResult([]);
        }
      } catch (error) {
        console.error('Error searching data perkara:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchData();
  }, [searchText]);

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleItemPress = item => {
    navigation.navigate('DetailPerkara', {
      dataPerkaras: [item], // Kirim seluruh objek 'item' sebagai array tunggal
    });
  };

  return (
    <View>
      <HeaderPb3r onSearch={handleSearch} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.container}>
                  <Image
                    source={require('../../../assets/images/userq.png')}
                    style={styles.image}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Outfit-SemiBold',
                        color: Colors.dark,
                        fontSize: 19,
                        paddingRight: 70,
                      }}
                      allowFontScaling={false}>
                      {item.nama_tersangka}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Outfit-Regular',
                        color: Colors.dark,
                        fontSize: 12,
                      }}
                      allowFontScaling={false}>
                      No. Putusan Perkara : {item.no_putusan_perkara}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Outfit-Regular',
                        color: Colors.dark,
                        fontSize: 12,
                      }}
                      allowFontScaling={false}>
                      Tgl Putusan : {item.tanggal_putusan}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Outfit-Regular',
                        color: Colors.dark,
                        fontSize: 12,
                        paddingRight: 60,
                      }}
                      allowFontScaling={false}>
                      Barang Bukti:{' '}
                      {item.barang_bukti
                        .map(barang =>
                          barang.jenis_barang_bukti
                            .map(jenis => jenis.barang_bukti)
                            .join(', '),
                        )
                        .join(', ')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText} allowFontScaling={false}>
                  Tidak ada hasil ditemukan
                </Text>
              </View>
            )}
          />
        )}
      </View>
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
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  content: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontFamily: 'Outfit-Regular',
    color: Colors.secondary,
    fontSize: 18,
  },
});

export default SearchFeature;
