import { theme } from '@/constants/styles';
import { WorkoutSession } from '@api/types/entities.types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SessionCardProps {
  session: WorkoutSession;
  onDelete?: (id: number) => void;
}

export default function SessionCard({ session, onDelete }: SessionCardProps) {
  const router = useRouter();
  const startDate = new Date(session.start_time);
  const formattedDate = startDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const formattedTime = startDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePress = () => {
    router.push(`/workouts/${session.id}`);
  };

  const handleDelete = () => {
    if (!onDelete) return;
    Alert.alert(
      'Eliminar entrenamiento',
      '¿Estás seguro de que quieres eliminar este entrenamiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(session.id)
        }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.contentButton} onPress={handlePress}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={session.is_active ? "accessibility" : "checkmark-circle"}
            size={48}
            color={session.is_active ? theme.colors.primary : theme.colors.success}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {session.routine_name || 'Entrenamiento libre'}
          </Text>
          <Text style={styles.description}>
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </Text>
          <Text style={styles.description}>
            {formattedTime}
          </Text>
          <View style={styles.footer}>
            <View style={styles.badge}>
              <Ionicons name="barbell" size={14} color={theme.colors.text.secondary} />
              <Text style={styles.badgeText}>
                {session.sets.length} sets
              </Text>
            </View>
            {session.duration !== null && (
              <View style={[styles.badge, styles.durationBadge]}>
                <Ionicons name="time" size={14} color={theme.colors.text.secondary} />
                <Text style={styles.badgeText}>{session.duration} min</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {session.is_active && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Activo</Text>
        </View>
      )}

      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      )}
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
  contentButton: {
    flex: 1,
    flexDirection: 'row',
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationBadge: {
    marginLeft: 4,
  },
  badgeText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  statusContainer: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
});
