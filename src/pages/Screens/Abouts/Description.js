import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Description = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.description} allowFontScaling={false}>
        {'Aplikasi Si Teman Publik Kejaksaan Negeri Tanjung Jabung Timur adalah sebuah platform teknologi yang dirancang khusus untuk memberikan kemudahan, transparansi, dan keandalan dalam memberikan pelayanan kepada masyarakat di wilayah Kejaksaan Negeri Tanjung Jabung Timur.\n\n' +
          'Dengan aplikasi ini, masyarakat akan merasakan manfaat berupa kemudahan dalam mengakses berbagai layanan yang disediakan oleh kejaksaan. Melalui beberapa sentuhan di perangkat mereka, mereka dapat memperoleh informasi yang relevan tentang layanan yang tersedia, prosedur yang harus diikuti, dan waktu yang diperlukan untuk menyelesaikan berbagai proses hukum.\n\n' +
          'Aplikasi ini juga didesain dengan inovasi sebagai fokus utama. Dalam perkembangannya, aplikasi akan terus diperbarui untuk mengakomodasi kebutuhan masyarakat yang semakin berkembang, sehingga setiap pelayanan bisa menjadi lebih efisien dan efektif.\n\n' +
          'Aplikasi Si Teman Publik Kejaksaan Negeri Tanjung Jabung Timur adalah langkah maju dalam upaya mewujudkan pelayanan yang berkualitas, efisien, dan berorientasi pada kepentingan masyarakat. Dedikasi tinggi dari seluruh anggota kejaksaan dalam menyediakan pelayanan terbaik bagi masyarakat menjadi semangat yang menggerakkan pengembangan dan penggunaan aplikasi ini. \n\n' +
          'Aplikasi ini dikembangkan oleh Tim Programmer Dinas Komunikasi dan Informatika Kabupaten Tanjung Jabung Timur tahun 2023.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    fontFamily: 'Outfit-Regular',
  },
});

export default Description;
