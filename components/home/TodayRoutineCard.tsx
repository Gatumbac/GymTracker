import { RoutineSchedule } from '@api/types/entities.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Button from '../Button';

interface TodayRoutineCardProps {
  schedule?: RoutineSchedule;
  isLoading: boolean;
  onStart: () => void;
  isStarting?: boolean;
  hasTrainedToday?: boolean;
}

const TodayRoutineCard: React.FC<TodayRoutineCardProps> = ({
  schedule,
  isLoading,
  onStart,
  isStarting = false,
  hasTrainedToday = false
}) => {
  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Cargando tu plan...</Text>
      </View>
    );
  }

  if (!schedule) {
    return (
      <View style={[styles.card, styles.emptyCard]}>
        <View style={styles.iconContainer}>
          <Ionicons name="bed-outline" size={40} color="#4ECDC4" />
        </View>
        <Text style={styles.emptyTitle}>Día de Descanso</Text>
        <Text style={styles.emptyText}>El descanso es parte del entrenamiento. ¡Recupérate!</Text>
      </View>
    );
  }

  if (hasTrainedToday) {
    return (
      <View style={[styles.card, styles.completedCard]}>
        <View style={styles.completedHeader}>
          <View style={styles.completedIconContainer}>
            <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
          </View>
        </View>
        <Text style={styles.completedTitle}>¡Entrenamiento Completado!</Text>
        <Text style={styles.completedSubtext}>Excelente trabajo hoy. Sigue así</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.gradientOverlay} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>HOY</Text>
          </View>
          <Ionicons name="fitness" size={28} color="#FF6B6B" />
        </View>

        <Text style={styles.routineName}>{schedule.routine_name}</Text>
        <Text style={styles.routineSubtext}>¿Listo para romperla hoy?</Text>

        <Button
          title="Iniciar Entrenamiento"
          onPress={onStart}
          isLoading={isStarting}
          style={styles.startButton}
        />
      </View>
    </View>
  );
};

export default TodayRoutineCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
    minHeight: 220,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#FFF5F5',
    opacity: 0.5,
  },
  content: {
    padding: 24,
    position: 'relative',
    zIndex: 1,
  },
  loadingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#888',
    fontSize: 14,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  completedCard: {
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  completedHeader: {
    marginBottom: 16,
  },
  completedIconContainer: {
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 8,
    textAlign: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  completedSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD0D0',
  },
  tagText: {
    color: '#FF6B6B',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  routineName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 8,
    letterSpacing: -1,
    lineHeight: 38,
  },
  routineSubtext: {
    fontSize: 16,
    color: '#888',
    marginBottom: 28,
    lineHeight: 22,
  },
  startButton: {
    marginTop: 'auto',
  }
});
