import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeHeaderProps {
  userName?: string;
  onProfilePress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hola,</Text>
        <Text style={styles.name}>{userName || 'Atleta'}</Text>
      </View>

      <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
        <Ionicons name="person" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  }
});
