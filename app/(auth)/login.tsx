import Button from '@components/Button';
import ScreenContainer from '@components/ScreenContainer';
import TextInput from '@components/TextInput';
import { commonStyles } from '@constants/styles';
import { useAuth } from '@hooks/useAuth';
import { getErrorMessage } from '@utils/error';
import { LoginValidationErrors, validateLoginData } from '@utils/validation';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const validationErrors = validateLoginData({ username, password });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await signIn({ username, password });
    } catch (error) {
      const message = getErrorMessage(error);
      Alert.alert('Login Fallido', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <ScreenContainer centered>
      <Text style={commonStyles.title}>GymTracker 🏋️</Text>
      <TextInput
        label="Usuario"
        onChangeText={setUsername}
        value={username}
        placeholder="Nombre de usuario"
        autoCapitalize="none"
        error={errors.username}
      />
      <TextInput
        label="Contraseña"
        onChangeText={setPassword}
        value={password}
        placeholder="Tu contraseña"
        secureTextEntry={true}
        error={errors.password}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} isLoading={isSubmitting} />
      <Button title="Registrarse" onPress={handleRegister} disabled={isSubmitting} variant="secondary" />
    </ScreenContainer>
  );
}