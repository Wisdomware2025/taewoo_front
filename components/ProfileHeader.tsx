import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  name: string;
  profileImage: any;
  status: string;
}

const ProfileHeader: React.FC<Props> = ({ name, profileImage, status }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={profileImage} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 },
  info: {},
  name: { fontSize: 16, fontWeight: 'bold' },
  badge: {
    marginTop: 4,
    backgroundColor: '#e0f3e8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 12, color: '#7DCA79' },
});

export default ProfileHeader;
