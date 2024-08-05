import React from 'react';
import {View, StyleSheet, Alert, ScrollView, Linking} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Colors from '../../../utils/Colors';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nama diperlukan'),
  address: Yup.string().required('Alamat diperlukan'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Harus berupa angka')
    .min(10, 'Nomor HP harus minimal 10 digit')
    .required('Nomor HP diperlukan'),
  query: Yup.string().required('Pertanyaan diperlukan'),
});

const PelayananHukum = () => {
  const sendMessageToWhatsApp = values => {
    const message = `
    Dari User : SI TEMAN PUBLIK
    KEJAKSAAN NEGERI TANJUNG JABUNG TIMUR
    ==================
    Pelayanan Hukum
    =================\n\n
    Nama: ${values.name}\nAlamat: ${values.address}\nNomor HP: ${values.phone}\nPertanyaan: ${values.query}\n\nPesan ini dikirim melalui aplikasi Pelayanan Hukum (SI TEMAN PUBLIK).`;
    const phoneNumber = '6281248292233';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url)
      .then(() => {
        Alert.alert('Sukses', 'WhatsApp terbuka');
      })
      .catch(() => {
        Alert.alert('Error', 'Pastikan WhatsApp terpasang di perangkat Anda');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle} allowFontScaling={false}>
          Ajukan Pertanyaan
        </Card.Title>
        <Card.Divider />
        <Formik
          initialValues={{name: '', address: '', phone: '', query: ''}}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            sendMessageToWhatsApp(values);
            resetForm();
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Input
                placeholder="Nama"
                leftIcon={{type: 'font-awesome', name: 'user'}}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                errorMessage={touched.name && errors.name ? errors.name : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                allowFontScaling={false}
              />
              <Input
                placeholder="Alamat"
                leftIcon={{type: 'font-awesome', name: 'map-marker'}}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                errorMessage={
                  touched.address && errors.address ? errors.address : ''
                }
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                allowFontScaling={false}
              />
              <Input
                placeholder="Nomor HP"
                leftIcon={{type: 'font-awesome', name: 'phone'}}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
                errorMessage={touched.phone && errors.phone ? errors.phone : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                allowFontScaling={false}
              />
              <Input
                placeholder="Pertanyaan"
                leftIcon={{type: 'font-awesome', name: 'question-circle'}}
                onChangeText={handleChange('query')}
                onBlur={handleBlur('query')}
                value={values.query}
                errorMessage={touched.query && errors.query ? errors.query : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                allowFontScaling={false}
              />
              <Button
                title="Kirim"
                onPress={handleSubmit}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
              />
            </>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 24,
    color: '#333',
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PelayananHukum;
