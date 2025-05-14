import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Chatting from '../components/ChatBubble';
import { fetchUserInfo, translateMessage } from '../utils/api';

type Message =
  | { id: string; type: 'date'; text: string }
  | { id: string; type: 'chat'; text: string; isMe: boolean };

type ChatRouteParams = {
  user?: {
    name: string;
    profileImage: any;
    status: string;
  };
};

export default function ChatScreen() {
  const route = useRoute<RouteProp<{ params: ChatRouteParams }, 'params'>>();
  const userParams = route.params?.user;

  const [name, setName] = useState('알 수 없음');
  const [profileImage, setProfileImage] = useState<any>(require('../assets/default_profile.png'));
  const [status, setStatus] = useState('');

  const [nickname, setNickname] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (userParams) {
      setName(userParams.name);
      setProfileImage(userParams.profileImage);
      setStatus(userParams.status);
    }

    // ✅ 유저 정보 가져오기
    fetchUserInfo('userId')
      .then((data) => {
        setNickname(data.nickname);
        setJob(data.job);
      })
      .catch((err) => {
        console.error('유저 정보 가져오기 실패:', err);
      });
  }, [userParams]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 'header-1', type: 'date', text: '2025년 5월 14일' },
    { id: '1', type: 'chat', text: '테스트 챗', isMe: false },
  ]);

  const [inputText, setInputText] = useState('');

  // ✅ 번역 및 전송
  const handleTranslateSend = async () => {
    if (inputText.trim() === '') return;

    try {
      const data = await translateMessage(inputText);

      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'chat',
        text: data.translated,
        isMe: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
    } catch (error) {
      console.error('❌ 번역 전송 실패:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
        {/* ✅ 상단 프로필 바 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Image
            source={profileImage}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 12,
              color: 'green',
              borderWidth: 1,
              borderColor: '#7DCA79',
              borderRadius: 6,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            {status}
          </Text>
        </View>

        {/* 메시지 리스트 */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => {
            if (item.type === 'date') {
              return (
                <View style={{ alignItems: 'center', marginVertical: 8 }}>
                  <Text style={{ color: '#999', fontSize: 12 }}>{item.text}</Text>
                </View>
              );
            }
            return <Chatting message={item.text} isMe={item.isMe} />;
          }}
        />

        {/* 하단 입력창 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#CCC',
            borderRadius: 30,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              paddingHorizontal: 8,
              paddingVertical: 6,
            }}
            placeholder="메시지를 입력해주세요."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <TouchableOpacity
            onPress={handleTranslateSend}
            style={{
              backgroundColor: '#7DCA79',
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 6,
              marginLeft: 4,
            }}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>번역</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // TODO: 이미지 삽입 기능
            }}
            style={{ padding: 6, marginLeft: 4 }}
          >
            <Image
              source={require('../assets/images/image_icon.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTranslateSend}
            style={{ padding: 6, marginLeft: 4 }}
          >
            <Image
              source={require('../assets/images/send_icon.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
