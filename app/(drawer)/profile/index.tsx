import Button from "@/components/Button";
import { BioCard } from "@/components/profile/BioCard";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { PhysicalStatsCard } from "@/components/profile/PhysicalStatsCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import ScreenContainer from "@/components/ScreenContainer";
import LoadingScreen from '@components/LoadingScreen';
import { theme } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useProfile } from "@hooks/useProfile";
import { useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Profile = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const { profile, isLoading } = useProfile();

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro de que quieres cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Cerrar Sesión',
        onPress: () => {
          signOut();
        },
        style: 'destructive',
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
        <View style={styles.errorContainer}>
          <Ionicons name="person-circle-outline" size={80} color={theme.colors.gray[400]} />
          <Text style={styles.errorText}>No se pudo cargar el perfil</Text>
          <Button title="Cerrar Sesión" onPress={signOut} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ProfileHeader
        firstName={profile.first_name}
        lastName={profile.last_name}
        username={profile.username}
        email={profile.email}
      />

      <PersonalInfoCard
        firstName={profile.first_name}
        lastName={profile.last_name}
        birthDate={profile.birth_date}
      />

      <PhysicalStatsCard
        height={profile.height}
        weight={profile.weight}
      />

      <BioCard bio={profile.bio} />

      <View style={styles.actionContainer}>
        <Button
          title="Editar Perfil"
          onPress={() => router.push('/(drawer)/profile/edit')}
          variant="primary"
        />
        <View style={{ height: 10 }} />
        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
          variant="danger"
        />
      </View>
      <View style={{ height: 20 }} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  actionContainer: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
});

export default Profile;

