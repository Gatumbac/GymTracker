import TextInput from '@/components/TextInput';
import { theme } from '@/constants/styles';
import { RoutineItem, WorkoutSession, WorkoutSet } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseTrackingCardProps {
  item: RoutineItem;
  session: WorkoutSession;
  onAddSet: (exerciseId: number, setNumber: number, weight: string, reps: number) => Promise<void>;
}

export default function ExerciseTrackingCard({ item, session, onAddSet }: ExerciseTrackingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const exerciseSets = session.sets.filter(set => set.exercise === item.exercise);
  const nextSetNumber = exerciseSets.length + 1;
  const isCompleted = item.target_sets ? exerciseSets.length >= item.target_sets : false;

  const handleSaveSet = async () => {
    if (isCompleted) {
      Alert.alert('Completado', 'Ya completaste todos los sets de este ejercicio');
      return;
    }

    if (!weight || !reps) {
      Alert.alert('Error', 'Por favor ingresa peso y repeticiones');
      return;
    }

    const repsNum = parseInt(reps);
    if (isNaN(repsNum) || repsNum <= 0) {
      Alert.alert('Error', 'Repeticiones debe ser un número válido');
      return;
    }

    setIsSaving(true);
    try {
      await onAddSet(item.exercise, nextSetNumber, weight, repsNum);
      setWeight('');
      setReps('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el set');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{item.exercise_name}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.colors.text.secondary}
        />
      </View>

      <View style={styles.exerciseInfo}>
        <View style={styles.exerciseStat}>
          <Ionicons name="repeat" size={16} color={theme.colors.primary} />
          <Text style={styles.exerciseStatText}>{item.target_sets || 0} series</Text>
        </View>
        <View style={styles.exerciseStat}>
          <Ionicons name="refresh" size={16} color={theme.colors.primary} />
          <Text style={styles.exerciseStatText}>{item.target_reps || 0} reps</Text>
        </View>
      </View>

      {exerciseSets.length > 0 && (
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>
            {exerciseSets.length}/{item.target_sets || 0} completados
          </Text>
        </View>
      )}

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />

          {isCompleted ? (
            <View style={styles.completedContainer}>
              <Ionicons name="checkmark-circle" size={48} color={theme.colors.success} />
              <Text style={styles.completedTitle}>¡Ejercicio completado!</Text>
              <Text style={styles.completedText}>
                Completaste {exerciseSets.length} sets de este ejercicio
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.inputLabel}>Registrar Set {nextSetNumber}</Text>

              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Peso (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="decimal-pad"
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Reps"
                    value={reps}
                    onChangeText={setReps}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                onPress={handleSaveSet}
                disabled={isSaving}
              >
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.white} />
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Guardando...' : 'Guardar Set'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {exerciseSets.length > 0 && (
            <View style={styles.setsHistory}>
              <Text style={styles.historyTitle}>Sets completados:</Text>
              {exerciseSets.map((set: WorkoutSet, index: number) => (
                <View key={set.id} style={styles.setItem}>
                  <Text style={styles.setNumber}>Set {index + 1}</Text>
                  <Text style={styles.setValue}>{set.weight}kg × {set.reps} reps</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  exerciseName: {
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
  exerciseInfo: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  exerciseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exerciseStatText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  progressBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
  },
  progressText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
  },
  expandedContent: {
    marginTop: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginVertical: 0,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
  setsHistory: {
    marginTop: theme.spacing.md,
  },
  historyTitle: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.xs,
  },
  setItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  setNumber: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  setValue: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  completedTitle: {
    color: theme.colors.success,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
  },
  completedText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
  },
});
