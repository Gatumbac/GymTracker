import { theme } from '@/constants/styles';
import { Exercise } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: () => void;
}

export default function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.imageContainer}>
        {exercise.image_url ? (
          <Image
            source={{ uri: exercise.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="body-outline" size={64} color={theme.colors.text.primary} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {exercise.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {exercise.description}
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
    height: 125,
  },
  imageContainer: {
    width: 110,
    height: 125,
    backgroundColor: theme.colors.gray[100],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
  },
  placeholderText: {
    fontSize: 40,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  badgeMuscle: {
    backgroundColor: theme.colors.secondaryLight + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  badgeType: {
    backgroundColor: theme.colors.accent + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
  },
});
