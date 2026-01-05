import LoadingScreen from "@/components/LoadingScreen";
import ScreenContainer from "@/components/ScreenContainer";
import ActiveWorkoutView from "@/components/workouts/ActiveWorkoutView";
import WorkoutSummaryView from "@/components/workouts/WorkoutSummaryView";
import { commonStyles, theme } from "@/constants/styles";
import { useWorkoutDetail } from "@/hooks/useWorkoutDetail";
import { useWorkoutSession } from "@/hooks/useWorkoutSession";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { session, isLoading, error, refresh } = useWorkoutDetail(Number(id));
  const { finishSession, isLoading: isFinishing } = useWorkoutSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSessionUpdate = () => {
    refresh();
  };

  const handleFinish = async () => {
    if (!session) return;

    setIsProcessing(true);
    try {
      await finishSession(session.id);
      router.back();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo finalizar el entrenamiento. Intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading || isProcessing || isFinishing) {
    return <LoadingScreen text={isProcessing || isFinishing ? "Finalizando entrenamiento..." : "Cargando entrenamiento..."} />;
  }

  if (error || !session) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'No se pudo cargar la información del entrenamiento.'}
          </Text>
          <Text style={styles.backLink} onPress={() => router.back()}>
            Volver
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>
        {session.routine_name || 'Entrenamiento libre'}
      </Text>

      {session.is_active ? (
        <ActiveWorkoutView
          session={session}
          onFinish={handleFinish}
          onSessionUpdate={handleSessionUpdate}
        />
      ) : (
        <WorkoutSummaryView session={session} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
    marginBottom: theme.spacing.md,
  },
  backLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  description: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
    marginTop: 0,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
});
