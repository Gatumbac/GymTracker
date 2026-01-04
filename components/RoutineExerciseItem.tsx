import { theme } from '@/constants/styles';
import { RoutineItem } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';

interface RoutineExerciseItemProps {
  item: RoutineItem;
}

export default function RoutineExerciseItem({ item }: RoutineExerciseItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {item.exercise_image ? (
          <Image source={{ uri: item.exercise_image }} style={styles.image} resizeMode="cover" />
        ) : (
          <Ionicons name="fitness-outline" size={32} color={theme.colors.text.secondary} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.exercise_name}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="repeat" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>{item.target_sets || 0} Series</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="refresh" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>{item.target_reps || 0} Reps</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>{item.rest_time_seconds || 0}s</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  name: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    marginBottom: theme.spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
});
