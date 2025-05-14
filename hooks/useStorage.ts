import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key: string, defaultValue?: string) => {
const [value, setValue] = useState(defaultValue);

useEffect(() => {
const loadData = async () => {
const storedValue = await AsyncStorage.getItem(key);
if (storedValue !== null) setValue(storedValue);
};
loadData();
}, [key]);

const setStorageValue = async (newValue: string) => {
await AsyncStorage.setItem(key, newValue);
setValue(newValue);
};

return [value, setStorageValue] as const;
};