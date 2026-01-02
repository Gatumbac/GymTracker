import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Usuario y contraseña son obligatorios');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });
      Alert.alert('Éxito', 'Cuenta creada correctamente. Por favor inicia sesión.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intenta con otro usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <Text style={styles.label}>Usuario *</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Tu usuario para GymTracker"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Tu email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contraseña *</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Tu contraseña"
        secureTextEntry
      />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Tu nombre"
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Tu apellido"
      />

      <View style={styles.buttonContainer}>
        <Button title={isSubmitting ? "Registrando..." : "Registrarse"} onPress={handleRegister} disabled={isSubmitting} color="#469b76" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Volver al Login" onPress={() => router.back()} disabled={isSubmitting} color="#666" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  buttonContainer: { marginTop: 10 }
});