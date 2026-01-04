import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import TextInput from "@/components/TextInput";
import LoadingScreen from "@components/LoadingScreen";
import { commonStyles, theme } from "@constants/styles";
import { useProfile } from "@hooks/useProfile";
import { getErrorMessage } from "@utils/error";
import { ProfileValidationErrors, validateProfileData } from "@utils/validation";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function EditProfile() {
  const router = useRouter();
  const { profile, updateProfile, isLoading } = useProfile();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bio, setBio] = useState('');

  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  useEffect(() => {
    if (profile) {
      setBirthDate(profile.birth_date || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
      setBio(profile.bio || '');
    }
  }, [profile]);


  const handleSave = async () => {
    const validationErrors = validateProfileData({
      birth_date: birthDate,
      height,
      weight,
      bio,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await updateProfile({
        birth_date: birthDate,
        height,
        weight,
        bio,
      });
      router.back();
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Alert.alert('Cancelar', '¿Estás seguro de que quieres cancelar?', [
      {
        text: 'Cancelar',
        onPress: () => { },
      },
      {
        text: 'Aceptar',
        onPress: () => router.back(),
      },
    ]);
  };

  if (isLoading) {
    return (
      <LoadingScreen text="Cargando datos..." />
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Editar Perfil</Text>

      {/* Información Personal */}
      <View style={styles.section}>
        <TextInput
          label="Nombre"
          value={profile?.first_name || ''}
          editable={false}
          style={styles.readOnlyInput}
        />
        <TextInput
          label="Apellido"
          value={profile?.last_name || ''}
          editable={false}
          style={styles.readOnlyInput}
        />
        <TextInput
          label="Fecha de Nacimiento (YYYY-MM-DD)"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="1990-01-01"
          error={errors.birth_date}
        />
      </View>

      {/* Datos Físicos */}
      <View style={styles.section}>
        <View style={styles.formRow}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <TextInput
              label="Altura (cm)"
              value={height}
              onChangeText={setHeight}
              placeholder="170"
              keyboardType="numeric"
              error={errors.height}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              label="Peso (kg)"
              value={weight}
              onChangeText={setWeight}
              placeholder="70"
              keyboardType="numeric"
              error={errors.weight}
            />
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <TextInput
          label="Biografía"
          value={bio}
          onChangeText={setBio}
          placeholder="Cuéntanos sobre ti..."
          multiline
          numberOfLines={3}
          style={styles.bioInput}
          error={errors.bio}
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar Cambios"
          onPress={handleSave}
          isLoading={isSubmitting}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Cancelar"
          onPress={handleCancel}
          variant="secondary"
          disabled={isSubmitting}
        />
      </View>

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  readOnlyInput: {
    backgroundColor: theme.colors.gray[100],
    color: theme.colors.text.disabled,
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '100%',
    marginTop: theme.spacing.xxl,
  },
});
