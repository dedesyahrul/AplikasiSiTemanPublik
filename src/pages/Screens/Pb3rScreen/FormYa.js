import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import Colors from '../../../utils/Colors';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import {Picker as RNPicker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  fetchPengambilanBarangBukti,
  storePengambilanBarangBukti,
  fetchWilayahPengantar,
} from './../../../api/ApiService';
import {format, addHours} from 'date-fns';
import {id as localeId} from 'date-fns/locale';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const FormField = ({label, children}) => (
  <View style={styles.formField}>
    <Text style={styles.label} allowFontScaling={false}>
      {label}
    </Text>
    {children}
  </View>
);

const FilePicker = ({label, onFileSelect}) => {
  const [fileName, setFileName] = useState('');

  return (
    <FormField label={label}>
      <TouchableOpacity
        style={styles.fileButton}
        onPress={async () => {
          try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            const fileSize = result[0].size;
            console.log(`Ukuran file yang dipilih: ${fileSize} byte`);

            if (fileSize > MAX_FILE_SIZE) {
              Alert.alert(
                'Error',
                `Ukuran file maksimal adalah ${(
                  MAX_FILE_SIZE /
                  (1024 * 1024)
                ).toFixed(2)} MB. File yang Anda pilih memiliki ukuran ${(
                  fileSize /
                  (1024 * 1024)
                ).toFixed(2)} MB.`,
              );
              return;
            }
            setFileName(result[0].name);
            onFileSelect(result);
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              console.log('Pengguna membatalkan pengunggahan');
            } else {
              throw err;
            }
          }
        }}>
        <Text style={styles.fileButtonText} allowFontScaling={false}>
          Upload {label}
        </Text>
      </TouchableOpacity>
      {fileName ? (
        <Text style={styles.fileName} allowFontScaling={false}>
          {fileName}
        </Text>
      ) : null}
      <Text style={styles.fileSizeInfo} allowFontScaling={false}>
        Maksimum ukuran file: {(MAX_FILE_SIZE / (1024 * 1024)).toFixed(2)} MB
      </Text>
    </FormField>
  );
};

const FormYa = () => {
  const route = useRoute();
  const {itemId} = route.params;

  const [data, setData] = useState({
    nama_tersangka: '',
    nama_pengambil_barang_bukti: '',
    nomor_hp: '',
    wilayah_pengantar: '',
    alamat_pengantaran: '',
    tanggal_pengantaran: '',
    foto_ktp_kk_sim: '',
  });
  const [file, setFile] = useState(null);
  const [tanggalPengantaran, setTanggalPengantaran] = useState(new Date());
  const [tanggalPengantaranVisible, setTanggalPengantaranVisible] =
    useState(false);
  const [metodePengambilan, setMetodePengambilan] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wilayahPengantar, setWilayahPengantar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPengambilanBarangBukti(itemId);
        const {barangBukti, namaTersangka, wilayahPengantars} = response;

        setData(prevData => ({
          ...prevData,
          nama_tersangka: namaTersangka,
          barangBuktiId: barangBukti.id,
        }));

        setWilayahPengantar(wilayahPengantars);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    const fetchWilayah = async () => {
      try {
        const response = await fetchWilayahPengantar();
        setWilayahPengantar(response);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchWilayah();
  }, []);

  const showDatePicker = setter => {
    setter(true);
  };

  const onDateChange = (event, selectedDate, setter, visibleSetter) => {
    const currentDate = selectedDate || new Date();
    visibleSetter(Platform.OS === 'ios');
    setter(currentDate);
  };

  const handleFileSelect = file => {
    setData({...data, foto_ktp_kk_sim: file[0]?.name || null});
    setFile(file[0]);
  };

  const handleInputChange = (field, value) => {
    setData({...data, [field]: value});
  };

  const handleCheckboxChange = value => {
    setMetodePengambilan(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('nama_tersangka', data.nama_tersangka);
      formData.append(
        'nama_pengambil_barang_bukti',
        data.nama_pengambil_barang_bukti,
      );
      formData.append('nomor_hp', data.nomor_hp);
      formData.append('metode_pengambilan', metodePengambilan);
      if (metodePengambilan === 'Diantar') {
        formData.append('wilayah_pengantar', data.wilayah_pengantar);
        formData.append('alamat_pengantaran', data.alamat_pengantaran);
      }
      formData.append(
        'tanggal_pengantaran',
        addHours(tanggalPengantaran, 7).toISOString().split('T')[0],
      );
      if (file) {
        formData.append('foto_ktp_kk_sim', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      }

      const response = await storePengambilanBarangBukti(itemId, formData);
      setIsSuccess(true);

      // Buat pesan WhatsApp menggunakan data dari form
      const message = `
        Data Sukses Terkirim:
        -Pengambilan Barang Bukti-
        Nama Terpidana: ${data.nama_tersangka}
        Nama Pengambil Barang Bukti: ${data.nama_pengambil_barang_bukti}
        Nomor HP: ${data.nomor_hp}
        Metode Pengambilan: ${metodePengambilan}
        ${
          metodePengambilan === 'Diantar'
            ? `Wilayah Pengantar: ${
                data.wilayah_pengantar
              }\nAlamat Pengantaran: ${
                data.alamat_pengantaran
              }\nTanggal Pengantaran: ${format(tanggalPengantaran, 'PPPP', {
                locale: localeId,
              })}`
            : `Tanggal Pengambilan: ${format(tanggalPengantaran, 'PPPP', {
                locale: localeId,
              })}`
        }
      `;

      const phoneNumber = '6281248292233';
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message,
      )}`;
      Linking.openURL(url);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Error submitting form');
      } else if (error.response) {
        setErrorMessage('Error submitting form: ' + error.response.statusText);
      } else {
        setErrorMessage('Error submitting form: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText} allowFontScaling={false}>
          Data Sukses Terkirim
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      {errorMessage ? (
        <Text style={styles.errorText} allowFontScaling={false}>
          {errorMessage}
        </Text>
      ) : null}
      <FormField label="Nama Terpidana">
        <TextInput
          style={styles.input}
          value={data.nama_tersangka || ''}
          placeholder="Masukkan nama terpidana"
          editable={false}
          allowFontScaling={false}
        />
      </FormField>
      <FormField label="Nama Pengambilan Barang Bukti">
        <TextInput
          style={styles.input}
          allowFontScaling={false}
          value={data.nama_pengambil_barang_bukti || ''}
          placeholder="Masukkan nama pengambil barang bukti"
          onChangeText={text =>
            handleInputChange('nama_pengambil_barang_bukti', text)
          }
        />
      </FormField>
      <FormField label="Nomor HP">
        <TextInput
          style={styles.input}
          allowFontScaling={false}
          value={data.nomor_hp || ''}
          placeholder="Masukkan nomor HP"
          keyboardType="phone-pad"
          onChangeText={text => handleInputChange('nomor_hp', text)}
        />
      </FormField>
      <FormField label="Metode Pengambilan">
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              metodePengambilan === 'Diantar' && styles.checkedCheckbox,
            ]}
            onPress={() => handleCheckboxChange('Diantar')}>
            <Text
              style={[
                styles.checkboxText,
                metodePengambilan === 'Diantar' && styles.checkedCheckboxText,
              ]}
              allowFontScaling={false}>
              Diantar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              metodePengambilan === 'Ambil Sendiri' && styles.checkedCheckbox,
            ]}
            onPress={() => handleCheckboxChange('Ambil Sendiri')}>
            <Text
              style={[
                styles.checkboxText,
                metodePengambilan === 'Ambil Sendiri' &&
                  styles.checkedCheckboxText,
              ]}
              allowFontScaling={false}>
              Ambil Sendiri
            </Text>
          </TouchableOpacity>
        </View>
      </FormField>
      {metodePengambilan === 'Diantar' && (
        <>
          <FormField label="Pilih Wilayah Pengantaran">
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={itemValue =>
                  handleInputChange('wilayah_pengantar', itemValue)
                }
                items={wilayahPengantar.map(wilayah => ({
                  label: wilayah.nama,
                  value: wilayah.nama,
                }))}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{allowFontScaling: false}}
                placeholder={{
                  label: 'Pilih Wilayah Disini!',
                  value: null,
                  color: '#9EA0A4',
                }}
                Icon={() => {
                  return (
                    <Icon
                      name="arrow-drop-down"
                      size={24}
                      style={styles.icon}
                    />
                  );
                }}
              />
            </View>
          </FormField>
          <FormField label="Alamat Pengantaran">
            <TextInput
              style={styles.input}
              allowFontScaling={false}
              value={data.alamat_pengantaran || ''}
              placeholder="Masukkan alamat pengantaran"
              onChangeText={text =>
                handleInputChange('alamat_pengantaran', text)
              }
            />
          </FormField>
          <FormField label="Tanggal Pengantaran">
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => showDatePicker(setTanggalPengantaranVisible)}>
              <Text allowFontScaling={false}>
                {format(tanggalPengantaran, 'PPPP', {locale: localeId})}
              </Text>
            </TouchableOpacity>
            {tanggalPengantaranVisible && (
              <DateTimePicker
                value={tanggalPengantaran}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  onDateChange(
                    event,
                    selectedDate,
                    setTanggalPengantaran,
                    setTanggalPengantaranVisible,
                  )
                }
              />
            )}
          </FormField>
        </>
      )}
      {metodePengambilan === 'Ambil Sendiri' && (
        <FormField label="Tanggal Pengambilan">
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => showDatePicker(setTanggalPengantaranVisible)}>
            <Text allowFontScaling={false}>
              {format(tanggalPengantaran, 'PPPP', {locale: localeId})}
            </Text>
          </TouchableOpacity>
          {tanggalPengantaranVisible && (
            <DateTimePicker
              value={tanggalPengantaran}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                onDateChange(
                  event,
                  selectedDate,
                  setTanggalPengantaran,
                  setTanggalPengantaranVisible,
                )
              }
            />
          )}
        </FormField>
      )}
      <FilePicker label="Foto KTP/KK/SIM" onFileSelect={handleFileSelect} />
      <TouchableOpacity
        style={[
          styles.submitButton,
          !metodePengambilan && styles.buttonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!metodePengambilan}>
        <Text style={styles.submitButtonText} allowFontScaling={false}>
          Kirim
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: Colors.dark,
    fontFamily: 'Outfit-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.light,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.light,
  },
  checkedCheckbox: {
    backgroundColor: Colors.primary,
  },
  checkboxText: {
    color: Colors.dark,
    fontFamily: 'Outfit-Medium',
  },
  checkedCheckboxText: {
    color: Colors.light,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.light,
    justifyContent: 'center',
  },
  fileButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  fileButtonText: {
    color: Colors.light,
  },
  fileName: {
    marginTop: 10,
    color: Colors.dark,
  },
  fileSizeInfo: {
    marginTop: 5,
    color: '#666',
    fontSize: 12,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.secondary,
  },
  submitButtonText: {
    color: Colors.light,
    fontSize: 16,
    fontFamily: 'Outfit-SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    backgroundColor: Colors.light,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default FormYa;
