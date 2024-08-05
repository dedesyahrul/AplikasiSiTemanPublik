import React from 'react';
import {View, FlatList, Text} from 'react-native';
import BannerPerkara from './BannerPerkara';
import BarangBuktiFlatList from './BarangBuktiFlatList';
import Colors from '../../../utils/Colors';

const DetailPerkara = ({route}) => {
  const {dataPerkaras} = route.params;

  const namaTersangka =
    dataPerkaras.length > 0 ? dataPerkaras[0].nama_tersangka : '';

  const nomorPutusan =
    dataPerkaras.length > 0 ? dataPerkaras[0].no_putusan_perkara : '';

  const tanggalPutusan =
    dataPerkaras.length > 0 ? dataPerkaras[0].tanggal_putusan : '';

  const petikanPutusan =
    dataPerkaras.length > 0 ? dataPerkaras[0].petikan_putusan : '';

  return (
    <FlatList
      data={dataPerkaras}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <BannerPerkara
          namaTersangka={namaTersangka}
          nomorPutusan={nomorPutusan}
          tanggalPutusan={tanggalPutusan}
          petikanPutusan={petikanPutusan}
        />
      }
      renderItem={({item}) => (
        <View key={item.id}>
          <BarangBuktiFlatList perkara={item} />
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors.secondary,
              marginRight: 20,
              marginLeft: 20,
            }}
          />
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Outfit-SemiBold',
                color: Colors.dark,
                fontSize: 15,
              }}
              allowFontScaling={false}>
              Persyaratan Ketentuan Berlaku :
            </Text>
            <Text
              style={{
                fontFamily: 'Outfit-SemiBold',
                color: Colors.secondary,
                fontSize: 12,
              }}
              allowFontScaling={false}>
              Pelayanan Jaksa Ngartis hanya bisa dilakukan pada daerah ….
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default DetailPerkara;
