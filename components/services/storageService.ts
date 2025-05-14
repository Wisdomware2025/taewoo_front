import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
// 이름 저장
saveName: async (name: string) => {
try {
await AsyncStorage.setItem('@user_name', name);
} catch (error) {
console.error('저장 실패:', error);
}
},

// 이름 불러오기
getName: async () => {
try {
return await AsyncStorage.getItem('@user_name');
} catch (error) {
console.error('불러오기 실패:', error);
return null;
}
}
};