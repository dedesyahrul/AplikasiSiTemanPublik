import React from 'react';
import {View, StyleSheet, Alert, ScrollView, Linking} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  query: Yup.string().required('Query is required'),
});

const PelayananHukum = () => {
  const sendMessageToWhatsApp = values => {
    const message = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nQuery: ${values.query}`;
    const phoneNumber = '6281248292233';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    Linking.openURL(url)
      .then(() => {
        Alert.alert('Success', 'WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Error', 'Make sure WhatsApp is installed on your device');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Pelayanan Hukum</Card.Title>
        <Card.Divider />
        <Formik
          initialValues={{name: '', email: '', phone: '', query: ''}}
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
                placeholder="Name"
                leftIcon={{type: 'font-awesome', name: 'user'}}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                errorMessage={touched.name && errors.name ? errors.name : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Input
                placeholder="Email"
                leftIcon={{type: 'font-awesome', name: 'envelope'}}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                errorMessage={touched.email && errors.email ? errors.email : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Input
                placeholder="Phone Number"
                leftIcon={{type: 'font-awesome', name: 'phone'}}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="phone-pad"
                errorMessage={touched.phone && errors.phone ? errors.phone : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Input
                placeholder="Query"
                leftIcon={{type: 'font-awesome', name: 'question-circle'}}
                onChangeText={handleChange('query')}
                onBlur={handleBlur('query')}
                value={values.query}
                errorMessage={touched.query && errors.query ? errors.query : ''}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Button
                title="Submit"
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
    backgroundColor: '#f0f4f7',
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
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PelayananHukum;
