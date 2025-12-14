import { supabase } from '@lib/supabase';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Éxito', 'Usuario creado. ¡Ahora puedes iniciar sesión!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymTracker 🏋️</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Registrarse" disabled={loading} onPress={signUpWithEmail} color="#469b76" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 10, borderRadius: 5 },
  buttonContainer: { marginTop: 10 }
});