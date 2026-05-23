import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const APP_VERSION = Constants.expoConfig?.version || 'N/A';

let cachedDeviceId: string | null = null;

const getDeviceId = async () => {
  if (cachedDeviceId) return cachedDeviceId;
  cachedDeviceId =
    (await AsyncStorage.getItem('device_id')) ||
    crypto.randomUUID().slice(0, 23);
  AsyncStorage.setItem('device_id', cachedDeviceId);
  return cachedDeviceId;
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Secret': process.env.EXPO_PUBLIC_APP_SECRET,
  },
});

// Intercept req
apiClient.interceptors.request.use(async (config) => {
  config.headers['x-device-id'] = await getDeviceId();
  config.headers['x-app-version'] = APP_VERSION;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.error(
        `API Error ${error.response.status}: ${error.response.data}`,
      );
    } else if (error.request) {
      console.error('API Error: No response received from server');
    } else {
      console.error(`API Error: ${error.message}`);
    }

    return Promise.reject(error);
  },
);

export async function fetchGet<T>(url: string): Promise<T> {
  const response = await apiClient.get<T>(url);
  return response.data;
}
