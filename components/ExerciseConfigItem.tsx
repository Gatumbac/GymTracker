import { theme } from '@/constants/styles';
import { Exercise } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ExerciseConfig {
  target_sets?: number;
  target_reps?: number;
  rest_time_seconds?: number;
}

interface ExerciseConfigItemProps {
  exercise: Exercise;
  config: ExerciseConfig;
  onConfigChange: (config: ExerciseConfig) => void;
  onRemove: () => void;
  error?: string;
}

export default function ExerciseConfigItem({
  exercise,
  config,
  onConfigChange,
  onRemove,
  error
}: ExerciseConfigItemProps) {
  const [sets, setSets] = useState(config.target_sets?.toString() || '4');
  const [reps, setReps] = useState(config.target_reps?.toString() || '12');
  const [rest, setRest] = useState(config.rest_time_seconds?.toString() || '120');

  const handleSetsChange = (text: string) => {
    setSets(text);
    const value = text.trim() === '' ? undefined : parseInt(text) || undefined;
    onConfigChange({ ...config, target_sets: value });
  };

  const handleRepsChange = (text: string) => {
    setReps(text);
    const value = text.trim() === '' ? undefined : parseInt(text) || undefined;
    onConfigChange({ ...config, target_reps: value });
  };

  const handleRestChange = (text: string) => {
    setRest(text);
    const value = text.trim() === '' ? undefined : parseInt(text) || undefined;
    onConfigChange({ ...config, rest_time_seconds: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {exercise.name}
        </Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Ionicons name="close-circle" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.configRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sets</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 4"
            value={sets}
            onChangeText={handleSetsChange}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reps</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 12"
            value={reps}
            onChangeText={handleRepsChange}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descanso (s)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ej: 120"
            value={rest}
            onChangeText={handleRestChange}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    elevation: 1,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    flex: 1,
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  configRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.weights.medium,
  },
  errorContainer: {
    backgroundColor: theme.colors.error + '20',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
  input: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
