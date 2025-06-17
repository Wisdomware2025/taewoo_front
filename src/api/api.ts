// src/api/api.ts
import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 서버 주소를 실제 개발환경 IP로 바꿔주세요
const SERVER_IP = '172.28.2.114';
const PORT = '5000';
const BASE_URL = `http://${SERVER_IP}:${PORT}/api`;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 전 토큰이 있으면 Authorization 헤더에 추가
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
