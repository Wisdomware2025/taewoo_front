import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateSeparator = ({ date }: { date: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{date}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#888',
    fontSize: 12,
  },
});

export default DateSeparator;
