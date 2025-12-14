import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Inicio', 
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="routines" 
        options={{ 
          title: 'Rutinas', 
          tabBarIcon: ({ color }) => <Ionicons name="barbell" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Perfil', 
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}