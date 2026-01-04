import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import RoutineCard from "@/components/RoutineCard";
import ScreenContainer from "@/components/ScreenContainer";
import { commonStyles, theme } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "@hooks/useRoutines";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

const RoutinesScreen = () => {
  const router = useRouter();
  const { routines, isLoading, error, deleteRoutine } = useRoutines();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateRoutine = () => {
    router.push('/create-routine');
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteRoutine(id);
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return <LoadingScreen text="Eliminando rutina..." />;
  }

  if (isLoading) {
    return <LoadingScreen text="Cargando rutinas..." />;
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Mis Rutinas</Text>

      <Button
        onPress={handleCreateRoutine}
        style={styles.createButton}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="add-circle" size={24} color={theme.colors.text.inverse} />
          <Text style={styles.buttonText}>Crear Rutina</Text>
        </View>
      </Button>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {routines.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="barbell" size={100} color={theme.colors.text.secondary} />
          <Text style={styles.emptyText}>No tienes rutinas creadas</Text>
          <Text style={styles.emptySubtext}>Crea tu primera rutina para comenzar</Text>
        </View>
      ) : (
        routines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onDelete={handleDeleteRoutine}
          />
        ))
      )}
    </ScreenContainer>
  );
};

export default RoutinesScreen;

const styles = StyleSheet.create({
  createButton: {
    marginBottom: theme.spacing.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
  empty: {
    paddingVertical: theme.spacing.xxl * 2,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  emptyText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold,
  },
  emptySubtext: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
  },
  errorContainer: {
    backgroundColor: theme.colors.error + '20',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
  },
});

