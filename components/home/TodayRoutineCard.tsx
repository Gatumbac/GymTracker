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
}

const TodayRoutineCard: React.FC<TodayRoutineCardProps> = ({
  schedule,
  isLoading,
  onStart,
  isStarting = false
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

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>HOY</Text>
        </View>
        <Ionicons name="fitness-outline" size={24} color="#555" />
      </View>

      <Text style={styles.routineName}>{schedule.routine_name}</Text>
      <Text style={styles.routineSubtext}>Listo para romperla hoy?</Text>

      <Button
        title="Iniciar Entrenamiento"
        onPress={onStart}
        isLoading={isStarting}
        style={styles.startButton}
      />
    </View>
  );
};

export default TodayRoutineCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
    minHeight: 200,
    justifyContent: 'center',
  },
  loadingCard: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#888',
    fontSize: 14,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagContainer: {
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    color: '#FF6B6B',
    fontWeight: '700',
    fontSize: 12,
  },
  routineName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  routineSubtext: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  startButton: {
    marginTop: 'auto',
  }
});
