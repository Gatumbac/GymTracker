import LoadingScreen from "@/components/LoadingScreen";
import ScreenContainer from "@/components/ScreenContainer";
import SessionCard from "@/components/SessionCard";
import { commonStyles, theme } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutHistory } from "@hooks/useWorkoutHistory";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


const WorkoutsIndex = () => {
  const { sessions, isLoading, error, refresh, deleteSession } = useWorkoutHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteSession(id);
    } catch (error) {
      console.error('Error al eliminar entrenamiento:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return <LoadingScreen text="Eliminando entrenamiento..." />;
  }

  if (isLoading && sessions.length === 0) {
    return <LoadingScreen text="Cargando historial..." />;
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Entrenamientos</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {sessions.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={100} color={theme.colors.text.secondary} />
          <Text style={styles.emptyText}>Sin historial de entrenamientos</Text>
          <Text style={styles.emptySubtext}>Completa tu primera rutina para verla aquí</Text>
        </View>
      ) : (
        sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onDelete={!session.is_active ? handleDelete : undefined}
          />
        ))
      )}
    </ScreenContainer>
  );
};

export default WorkoutsIndex;

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
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