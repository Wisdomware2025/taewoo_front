// 공통 axios 인스턴스 설정
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_IP = '172.28.2.114';
const PORT      = '5000';
const BASE_URL  = `http://${SERVER_IP}:${PORT}`;  // /auth/* 를 바로 호출

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
