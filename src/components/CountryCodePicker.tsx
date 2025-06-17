// src/components/CountryCodePicker.tsx
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import RawPicker from 'react-native-dropdown-country-picker';

// 이 인터페이스는 실제로 사용하는 Props 형태입니다.
export interface CountryCodeProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setCountryDetails?: React.Dispatch<
    React.SetStateAction<{ code: string; country: string }>
  >;
  phone?: string;
  setPhone?: React.Dispatch<React.SetStateAction<string>>;
  countryCodeTextStyles?: TextStyle;
  countryCodeContainerStyles?: ViewStyle;
}

// RawPicker 자체를 CountryCodeProps에 맞춰서 FC로 캐스팅
const CountryCodeDropdownPicker = RawPicker as React.FC<CountryCodeProps>;

export default CountryCodeDropdownPicker;
