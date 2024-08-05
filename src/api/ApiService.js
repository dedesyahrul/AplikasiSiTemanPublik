import axios from 'axios';
import {
  API_BASE_URL,
  IMAGES_ENDPOINT,
  DATA_PERKARA_ENDPOINT,
  FILE_SURAT_KUASA,
  PENGAMBILAN_BARANG_BUKTI_ENDPOINT,
  WILAYAH_PENGANTARAN_ENDPOINT,
} from './ApiConfig';

const TOKEN = '1|59cvdn6cr8st62eXwgqV7aE4Y4PuGZpGc4uZKCoy';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchImages = async () => {
  try {
    const response = await axiosInstance.get(IMAGES_ENDPOINT);
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
        ? await axiosInstance.get(DATA_PERKARA_ENDPOINT)
        : await axiosInstance.post(DATA_PERKARA_ENDPOINT, data);

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
    const response = await axiosInstance.get(
      `${DATA_PERKARA_ENDPOINT}/${itemId}`,
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

export const fetchPengambilanBarangBukti = async itemId => {
  try {
    const response = await axiosInstance.get(
      `${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}/create/${itemId}`,
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const createPengambilanBarangBukti = async (barangBuktiId, data) => {
  try {
    const url = `${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}/create/${barangBuktiId}`;
    console.log('Creating URL:', url);
    const response = await axiosInstance.post(url, data);
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

export const storePengambilanBarangBukti = async (itemId, formData) => {
  try {
    const response = await axiosInstance.post(
      `${PENGAMBILAN_BARANG_BUKTI_ENDPOINT}/store/${itemId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchWilayahPengantar = async () => {
  try {
    const response = await axiosInstance.get(WILAYAH_PENGANTARAN_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchSuratKuasa = async () => {
  try {
    const response = await axiosInstance.get(FILE_SURAT_KUASA);
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
