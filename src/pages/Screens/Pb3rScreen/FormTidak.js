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
              console.log('User cancelled the upload');
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

const FormTidak = () => {
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
    penerima_kuasa: '',
    surat_kuasa: '',
    penerima_surat_kuasa: '',
  });
  const [file, setFile] = useState({
    foto_ktp_kk_sim: null,
    penerima_kuasa: null,
    surat_kuasa: null,
    penerima_surat_kuasa: null,
  });
  const [metodePengambilan, setMetodePengambilan] = useState(null);
  const [tanggalPengantaran, setTanggalPengantaran] = useState(new Date());
  const [tanggalPengantaranVisible, setTanggalPengantaranVisible] =
    useState(false);
  const [tanggalPengambilan, setTanggalPengambilan] = useState(new Date());
  const [tanggalPengambilanVisible, setTanggalPengambilanVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleFileSelect = (field, file) => {
    setData({...data, [field]: file[0]?.name || null});
    setFile(prevFile => ({...prevFile, [field]: file[0]}));
  };

  const handleInputChange = (field, value) => {
    setData({...data, [field]: value});
  };

  const handleCheckboxPress = value => {
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
        formData.append(
          'tanggal_pengantaran',
          addHours(tanggalPengantaran, 7).toISOString().split('T')[0],
        );
      } else if (metodePengambilan === 'Ambil Sendiri') {
        formData.append(
          'tanggal_pengantaran',
          addHours(tanggalPengambilan, 7).toISOString().split('T')[0],
        );
      }
      if (file.foto_ktp_kk_sim) {
        formData.append('foto_ktp_kk_sim', {
          uri: file.foto_ktp_kk_sim.uri,
          type: file.foto_ktp_kk_sim.type,
          name: file.foto_ktp_kk_sim.name,
        });
      }
      if (file.penerima_kuasa) {
        formData.append('penerima_kuasa', {
          uri: file.penerima_kuasa.uri,
          type: file.penerima_kuasa.type,
          name: file.penerima_kuasa.name,
        });
      }
      if (file.surat_kuasa) {
        formData.append('surat_kuasa', {
          uri: file.surat_kuasa.uri,
          type: file.surat_kuasa.type,
          name: file.surat_kuasa.name,
        });
      }
      if (file.penerima_surat_kuasa) {
        formData.append('penerima_surat_kuasa', {
          uri: file.penerima_surat_kuasa.uri,
          type: file.penerima_surat_kuasa.type,
          name: file.penerima_surat_kuasa.name,
        });
      }

      const response = await storePengambilanBarangBukti(itemId, formData);
      setIsSuccess(true);

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
            : `Tanggal Pengambilan: ${format(tanggalPengambilan, 'PPPP', {
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
          value={data.nama_pengambil_barang_bukti}
          placeholder="Masukkan nama pengambil barang bukti"
          onChangeText={text =>
            handleInputChange('nama_pengambil_barang_bukti', text)
          }
        />
      </FormField>
      <FormField label="Nomor HP">
        <TextInput
          style={styles.input}
          value={data.nomor_hp}
          allowFontScaling={false}
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
            onPress={() => handleCheckboxPress('Diantar')}>
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
            onPress={() => handleCheckboxPress('Ambil Sendiri')}>
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
              value={data.alamat_pengantaran}
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
        <>
          <FormField label="Tanggal Pengambilan">
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => showDatePicker(setTanggalPengambilanVisible)}>
              <Text allowFontScaling={false}>
                {format(tanggalPengambilan, 'PPPP', {locale: localeId})}
              </Text>
            </TouchableOpacity>
            {tanggalPengambilanVisible && (
              <DateTimePicker
                value={tanggalPengambilan}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  onDateChange(
                    event,
                    selectedDate,
                    setTanggalPengambilan,
                    setTanggalPengambilanVisible,
                  )
                }
              />
            )}
          </FormField>
        </>
      )}
      <FilePicker
        label="Foto KTP/KK/SIM Pemberi Kuasa"
        onFileSelect={file => handleFileSelect('foto_ktp_kk_sim', file)}
      />
      <FilePicker
        label="Foto KTP/KK/SIM Penerima Kuasa"
        onFileSelect={file => handleFileSelect('penerima_kuasa', file)}
      />
      <FilePicker
        label="Surat Kuasa"
        onFileSelect={file => handleFileSelect('surat_kuasa', file)}
      />
      <FilePicker
        label="Dokumentasi Pemberian Surat Kuasa"
        onFileSelect={file => handleFileSelect('penerima_surat_kuasa', file)}
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          !metodePengambilan && styles.submitButtonDisabled,
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
  submitButtonDisabled: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
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

export default FormTidak;
