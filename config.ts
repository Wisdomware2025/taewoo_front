const SERVER_BASE_URL = 'http://192.168.56.1:8081'; 

export const API = {
  USER_INFO: (userId: string) => `${SERVER_BASE_URL}/user-info:${userId}`,

  TRANSLATE: `${SERVER_BASE_URL}/translate`,
};
