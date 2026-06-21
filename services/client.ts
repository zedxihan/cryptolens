import AsyncStorage from '@react-native-async-storage/async-storage';
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
  await AsyncStorage.setItem('device_id', cachedDeviceId);
  return cachedDeviceId;
};

export async function fetchGet<T>(url: string): Promise<T> {
  const deviceId = await getDeviceId();
  const res = await fetch(`${BASE_URL}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-App-Secret': process.env.EXPO_PUBLIC_APP_SECRET || '',
      'x-device-id': deviceId,
      'x-app-version': APP_VERSION,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error(`API Error ${res.status}:`, err.error || res.statusText);
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}
