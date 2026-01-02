import { theme } from '@/constants/styles';
import { Routine } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RoutineCardProps {
  routine: Routine;
  onDelete: (id: number) => void;
}

export default function RoutineCard({ routine, onDelete }: RoutineCardProps) {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Rutina',
      `¿Estás seguro de eliminar "${routine.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(routine.id),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="barbell" size={48} color={theme.colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {routine.name}
        </Text>
        {routine.description && (
          <Text style={styles.description} numberOfLines={2}>
            {routine.description}
          </Text>
        )}
        <View style={styles.badge}>
          <Ionicons name="fitness" size={14} color={theme.colors.text.secondary} />
          <Text style={styles.badgeText}>
            {routine.items.length} {routine.items.length === 1 ? 'ejercicio' : 'ejercicios'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash" size={24} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
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
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: theme.colors.primaryLight + '20',
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  deleteButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
});
