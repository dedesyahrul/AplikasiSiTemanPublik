import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormBantuanHukum = () => {
  const [institutionName, setInstitutionName] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [file, setFile] = useState(null);

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = () => {
    if (!institutionName || !requestDetails || !file) {
      Alert.alert('Error', 'Please fill all fields and upload a file.');
      return;
    }
    // Implement the submit functionality here
    Alert.alert('Success', 'Form submitted successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} allowFontScaling={false}>
        Ajukan Bantuan Hukum
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="business" size={24} color="gray" style={styles.icon} />
        <TextInput
          value={institutionName}
          onChangeText={setInstitutionName}
          placeholder="Nama Instansi"
          style={styles.input}
          allowFontScaling={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="description" size={24} color="gray" style={styles.icon} />
        <TextInput
          value={requestDetails}
          onChangeText={setRequestDetails}
          placeholder="Perihal Permohonan"
          style={styles.input}
          multiline
          allowFontScaling={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
        <Icon name="file-upload" size={24} color="white" />
        <Text style={styles.buttonText} allowFontScaling={false}>
          Upload File
        </Text>
      </TouchableOpacity>
      {file && (
        <Text style={styles.fileName} allowFontScaling={false}>
          {file.name}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText} allowFontScaling={false}>
          Kirim
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#495057',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  fileName: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#6c757d',
  },
});

export default FormBantuanHukum;
