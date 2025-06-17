// src/@types/react-native-dropdown-country-picker/index.d.ts
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

declare module 'react-native-dropdown-country-picker' {
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

  const CountryCodeDropdownPicker: React.FC<CountryCodeProps>;
  export default CountryCodeDropdownPicker;
}
