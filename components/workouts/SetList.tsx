import { theme } from '@/constants/styles';
import { WorkoutSet } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, View } from 'react-native';

interface SetListProps {
  sets: WorkoutSet[];
}

interface GroupedSets {
  [exerciseId: number]: {
    name: string;
    image?: string | null;
    sets: WorkoutSet[];
  };
}

export default function SetList({ sets }: SetListProps) {
  const groupedSets: GroupedSets = sets.reduce((acc, set) => {
    if (!acc[set.exercise]) {
      acc[set.exercise] = {
        name: set.exercise_name,
        image: set.exercise_image,
        sets: []
      };
    }
    acc[set.exercise].sets.push(set);
    return acc;
  }, {} as GroupedSets);

  return (
    <View style={styles.container}>
      {Object.values(groupedSets).map((group, index) => (
        <View key={index} style={styles.exerciseGroup}>
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              {group.image ? (
                <Image source={{ uri: group.image }} style={styles.image} resizeMode="cover" />
              ) : (
                <Ionicons name="fitness-outline" size={32} color={theme.colors.text.secondary} />
              )}
            </View>
            <Text style={styles.exerciseName}>{group.name}</Text>
          </View>


          <View style={styles.setsContainer}>
            {group.sets.map((set: WorkoutSet, setIndex: number) => (
              <View key={set.id} style={styles.setRow}>
                <Text style={styles.setNumber}>Set {setIndex + 1}</Text>
                <View style={styles.setDetails}>
                  <View style={styles.setInfo}>
                    <Ionicons name="barbell" size={16} color={theme.colors.primary} />
                    <Text style={styles.setValue}>{set.weight} kg</Text>
                  </View>
                  <View style={styles.setInfo}>
                    <Ionicons name="refresh" size={16} color={theme.colors.primary} />
                    <Text style={styles.setValue}>{set.reps} reps</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  exerciseGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    width: 50,
    height: 50,
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
  exerciseName: {
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
  setsContainer: {
    gap: theme.spacing.sm,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  setNumber: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  setDetails: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  setValue: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
});
