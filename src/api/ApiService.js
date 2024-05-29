import axios from 'axios';
import {
  API_BASE_URL,
  IMAGES_ENDPOINT,
  DATA_PERKARA_ENDPOINT,
  FILE_SURAT_KUASA,
  PENGAMBILAN_BARANG_BUKTI_ENDPOINT,
} from './ApiConfig';

export const fetchImages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${IMAGES_ENDPOINT}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(
      `Error fetching images: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};

export const fetchDataPerkara = async (method = 'GET', data = null) => {
  try {
    const response =
      method === 'GET'
        ? await axios.get(`${API_BASE_URL}${DATA_PERKARA_ENDPOINT}`)
        : await axios.post(`${API_BASE_URL}${DATA_PERKARA_ENDPOINT}`, data);

    return response.data.dataPerkaras;
  } catch (error) {
    console.error('Error fetching data perkara:', error);
    throw new Error(
      `Error fetching data perkara: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};

export const fetchDataPerkaraById = async itemId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${DATA_PERKARA_ENDPOINT}/${itemId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data perkara by ID:', error);
    throw new Error(
      `Error fetching data perkara by ID: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};

export const fetchPengambilanBarangBukti = async id => {
  try {
    const url = `${API_BASE_URL}${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}`;
    console.log('Fetching URL:', url);
    const response = await axios.get(url);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pengambilan barang bukti:', error);
    throw new Error(
      `Error fetching pengambilan barang bukti: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};

export const createPengambilanBarangBukti = async (barangBuktiId, data) => {
  try {
    const url = `${API_BASE_URL}${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}/create/${barangBuktiId}`;
    console.log('Creating URL:', url);
    const response = await axios.post(url, data);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating pengambilan barang bukti:', error);
    throw new Error(
      `Error creating pengambilan barang bukti: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};

export const storePengambilanBarangBukti = async (barangBuktiId, data) => {
  try {
    const url = `${API_BASE_URL}${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}/store/${barangBuktiId}`;
    console.log('Storing URL:', url);
    console.log('Payload:', JSON.stringify(data, null, 2)); // Tambahkan logging payload
    const response = await axios.post(url, data);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error storing pengambilan barang bukti:', error);
    if (error.response) {
      console.error('Error Response Data:', error.response.data); // Log detail error response
      throw new Error(
        `Error storing pengambilan barang bukti: ${
          error.response.data.message || error.response.statusText
        }`,
      );
    }
    throw new Error(`Error storing pengambilan barang bukti: ${error.message}`);
  }
};

export const fetchSuratKuasa = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${FILE_SURAT_KUASA}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching surat kuasa:', error);
    throw new Error(
      `Error fetching surat kuasa: ${
        error.response ? error.response.data.message : error.message
      }`,
    );
  }
};
