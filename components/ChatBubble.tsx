import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ChatBubbleProps {
  message: string;
  isMe: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMe }) => (
  <View style={[styles.container, isMe ? styles.myMessageContainer : styles.otherMessageContainer]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
  myMessageContainer: {
    backgroundColor: '#DCF8C5',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatBubble;
