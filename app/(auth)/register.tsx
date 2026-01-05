import Button from '@components/Button';
import ScreenContainer from '@components/ScreenContainer';
import TextInput from '@components/TextInput';
import { commonStyles } from '@constants/styles';
import { useAuth } from '@hooks/useAuth';
import { getErrorMessage } from '@utils/error';
import { RegisterValidationErrors, validateRegisterData } from '@utils/validation';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<RegisterValidationErrors>({});

  const { signUp } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    const validationErrors = validateRegisterData({
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
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
        {
          text: 'OK',
          onPress: () => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/login');
            }
          }
        }
      ]);
    } catch (error) {
      const message = getErrorMessage(error);
      Alert.alert('Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer centered>
      <Text style={commonStyles.title}>Crear Cuenta</Text>

      <TextInput
        label="Usuario *"
        onChangeText={setUsername}
        value={username}
        placeholder="Tu usuario para GymTracker"
        autoCapitalize="none"
        error={errors.username}
      />

      <TextInput
        label="Email *"
        onChangeText={setEmail}
        value={email}
        placeholder="Tu email"
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email}
      />

      <TextInput
        label="Contraseña *"
        onChangeText={setPassword}
        value={password}
        placeholder="Tu contraseña"
        secureTextEntry
        error={errors.password}
      />

      <TextInput
        label="Nombre *"
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Tu nombre"
        error={errors.first_name}
      />

      <TextInput
        label="Apellido *"
        onChangeText={setLastName}
        value={lastName}
        placeholder="Tu apellido"
        error={errors.last_name}
      />

      <Button title="Registrarse" onPress={handleRegister} isLoading={isSubmitting} variant="primary" />
      <Button title="Volver al Login" onPress={() => router.back()} disabled={isSubmitting} variant="secondary" />
    </ScreenContainer>
  );
}