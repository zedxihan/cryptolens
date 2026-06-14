import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'axios';
import * as Crypto from 'expo-crypto';
import Constants from 'expo-constants';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const APP_VERSION = Constants.expoConfig?.version || 'N/A';

let cachedDeviceId: string | null = null;

const getDeviceId = async () => {
  if (cachedDeviceId) return cachedDeviceId;
  cachedDeviceId =
    (await AsyncStorage.getItem('device_id')) ||
    Crypto.randomUUID().slice(0, 23);
  AsyncStorage.setItem('device_id', cachedDeviceId);
  return cachedDeviceId;
};

export const apiClient = create({
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

export async function fetchGet<T>(url: string): Promise<T> {
  return apiClient
    .get<T>(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        `API Error${error.response ? ` ${error.response.status}` : ''}:`,
        error.response?.data?.error || error.message,
      );
      throw error;
    });
}
