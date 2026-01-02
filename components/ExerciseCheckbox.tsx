import { theme } from '@/constants/styles';
import { Exercise } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseCheckboxProps {
  exercise: Exercise;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

export default function ExerciseCheckbox({ exercise, isSelected, onToggle }: ExerciseCheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onToggle(exercise.id)}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {exercise.name}
        </Text>
        <View style={styles.badges}>
          {exercise.muscle_group_name && (
            <View style={styles.badgeMuscle}>
              <Text style={styles.badgeText}>{exercise.muscle_group_name}</Text>
            </View>
          )}
          {exercise.exercise_type_name && (
            <View style={styles.badgeType}>
              <Text style={styles.badgeText}>{exercise.exercise_type_name}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 90,
    alignItems: 'center',
    paddingLeft: theme.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: theme.colors.primary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  badgeMuscle: {
    backgroundColor: theme.colors.secondaryLight + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  badgeType: {
    backgroundColor: theme.colors.accent + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
  },
});
