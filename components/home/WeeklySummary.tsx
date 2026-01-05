import { RoutineSchedule, WorkoutSession } from '@api/types/entities.types';
import { Ionicons } from '@expo/vector-icons';
import { getDayOfWeekFromDate } from '@utils/date';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeeklySummaryProps {
  schedules: RoutineSchedule[];
  currentDayIndex: number;
  workoutSessions: WorkoutSession[];
}

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ schedules, currentDayIndex, workoutSessions }) => {

  const isDayScheduled = (dayIndex: number) => {
    return schedules.some(s => s.day_of_week === dayIndex);
  };

  const hasWorkoutOnDay = (dayIndex: number): boolean => {
    return workoutSessions.some(session => {
      const sessionDay = getDayOfWeekFromDate(session.start_time);
      return sessionDay === dayIndex && !session.is_active;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Semana</Text>
      <View style={styles.daysContainer}>
        {DAYS.map((day, index) => {
          const isToday = index === currentDayIndex;
          const hasRoutine = isDayScheduled(index);
          const hasWorkout = hasWorkoutOnDay(index);

          return (
            <View key={day} style={[styles.dayColumn, isToday && styles.todayColumn]}>
              <Text style={[styles.dayText, isToday && styles.todayText]}>{day[0]}</Text>
              <View style={[
                styles.indicator,
                hasRoutine && styles.scheduledIndicator,
                isToday && !hasRoutine && styles.todayEmptyIndicator,
                hasWorkout && styles.completedIndicator
              ]}>
                {hasWorkout ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : hasRoutine ? (
                  <View style={styles.innerDot} />
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WeeklySummary;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dayColumn: {
    alignItems: 'center',
    gap: 8,
  },
  todayColumn: {

  },
  dayText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  todayText: {
    color: '#FF6B6B',
    fontWeight: '700',
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduledIndicator: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFDEDE',
  },
  todayEmptyIndicator: {
    backgroundColor: '#FFF0F0',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  completedIndicator: {
    backgroundColor: '#4CAF50',
    borderWidth: 0,
  }
});
