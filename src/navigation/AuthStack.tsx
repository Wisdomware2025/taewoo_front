import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 화면 컴포넌트만 import
import SignIn from '../screens/SignIn/components/screens';
import SignUp from '../screens/SignUp';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
