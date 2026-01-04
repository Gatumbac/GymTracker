import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import TextInput from "@/components/TextInput";
import LoadingScreen from '@components/LoadingScreen';
import { commonStyles, theme } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useProfile } from "@hooks/useProfile";
import { getErrorMessage } from "@utils/error";
import { ProfileValidationErrors, validateProfileData } from "@utils/validation";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Profile = () => {
  const { signOut } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Campos del formulario
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bio, setBio] = useState('');

  // Errores de validacion
  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  // Inicializar formulario
  useEffect(() => {
    if (profile) {
      setBirthDate(profile.birth_date || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleCancel = () => {
    if (profile) {
      setBirthDate(profile.birth_date || '');
      setHeight(profile.height || '');
      setWeight(profile.weight || '');
      setBio(profile.bio || '');
    }
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    // Validar datos
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
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Cerrar Sesión',
        onPress: () => signOut(),
      },
    ]);
  };

  if (isLoading) {
    return (
      <LoadingScreen text="Cargando perfil..." />
    );
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <Text style={commonStyles.subtitle}>No se pudo cargar el perfil</Text>
        <Ionicons name="person" size={150} color={theme.colors.gray[400]} />
        <Button title="Cerrar Sesión" onPress={signOut} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Mi Perfil</Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&background=random&color=fff&size=128`
          }}
          style={{ width: 70, height: 70, borderRadius: 35 }}
        />
      </View>

      {/* Campos no editables */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de Cuenta</Text>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Usuario</Text>
          <Text style={styles.fieldValueReadOnly}>{profile.username}</Text>
        </View>
        {profile.email && (
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValueReadOnly}>{profile.email}</Text>
          </View>
        )}
      </View>

      {/* Informacion personal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        {isEditing ? (
          <>
            <TextInput
              label="Nombre"
              value={profile.first_name || ''}
              editable={false}
              style={styles.readOnlyInput}
            />
            <TextInput
              label="Apellido"
              value={profile.last_name || ''}
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
          </>
        ) : (
          <>
            {profile.first_name && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Nombre</Text>
                <Text style={styles.fieldValue}>{profile.first_name}</Text>
              </View>
            )}
            {profile.last_name && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Apellido</Text>
                <Text style={styles.fieldValue}>{profile.last_name}</Text>
              </View>
            )}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Fecha de Nacimiento</Text>
              <Text style={styles.fieldValue}>{birthDate || 'No especificado'}</Text>
            </View>
          </>
        )}
      </View>

      {/* Datos Físicos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Físicos</Text>

        {isEditing ? (
          <>
            <TextInput
              label="Altura (cm)"
              value={height}
              onChangeText={setHeight}
              placeholder="170"
              keyboardType="numeric"
              error={errors.height}
            />
            <TextInput
              label="Peso (kg)"
              value={weight}
              onChangeText={setWeight}
              placeholder="70"
              keyboardType="numeric"
              error={errors.weight}
            />
          </>
        ) : (
          <>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Altura</Text>
              <Text style={styles.fieldValue}>{height ? `${height} cm` : 'No especificado'}</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Peso</Text>
              <Text style={styles.fieldValue}>{weight ? `${weight} kg` : 'No especificado'}</Text>
            </View>
          </>
        )}
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre mí</Text>

        {isEditing ? (
          <TextInput
            label="Biografía"
            value={bio}
            onChangeText={setBio}
            placeholder="Cuéntanos sobre ti..."
            multiline
            numberOfLines={4}
            style={styles.bioInput}
            error={errors.bio}
          />
        ) : (
          <Text style={styles.bioText}>{bio || 'No hay biografía aún'}</Text>
        )}
      </View>

      {/* Botones de Accion */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <Button
              title="Guardar Cambios"
              onPress={handleSave}
              isLoading={isSubmitting}
            />
            <Button
              title="Cancelar"
              onPress={handleCancel}
              variant="secondary"
              disabled={isSubmitting}
            />
          </>
        ) : (
          <>
            <Button
              title="Editar Perfil"
              onPress={() => setIsEditing(true)}
              variant="primary"
            />
            <Button
              title="Cerrar Sesión"
              onPress={handleLogout}
              variant="danger"
            />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  section: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  fieldGroup: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  fieldValue: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
  },
  fieldValueReadOnly: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  readOnlyInput: {
    backgroundColor: theme.colors.gray[100],
    color: theme.colors.text.disabled,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  bioText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: theme.spacing.sm,
  },
});

export default Profile;

