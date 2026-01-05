import LoadingScreen from "@/components/LoadingScreen";
import ScreenContainer from "@/components/ScreenContainer";
import HomeHeader from "@/components/home/HomeHeader";
import TodayRoutineCard from "@/components/home/TodayRoutineCard";
import WeeklySummary from "@/components/home/WeeklySummary";
import { useProfile } from "@/hooks/useProfile";
import { DayOfWeek } from "@api/types/entities.types";
import { useRoutineSchedules } from "@hooks/useRoutineSchedules";
import { useWorkoutHistory } from "@hooks/useWorkoutHistory";
import { useWorkoutSession } from "@hooks/useWorkoutSession";
import { isSameDay } from "@utils/date";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const Index = () => {
  const { routineSchedules, isLoading: isLoadingSchedules, refetch } = useRoutineSchedules();
  const { startSession, isLoading: isStartingSession } = useWorkoutSession();
  const { sessions, isLoading: isLoadingSessions, refresh: refreshSessions } = useWorkoutHistory();
  const router = useRouter();
  const { profile, isLoading: isLoadingProfile } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
      refreshSessions();
    }, [refetch, refreshSessions])
  );

  const getTodayDayOfWeek = (): DayOfWeek => {
    let jsDay = new Date().getDay();
    jsDay = jsDay === 0 ? 6 : jsDay - 1;
    return jsDay;
  };

  const todayRoutineSchedule = routineSchedules.find(
    (schedule) => schedule.day_of_week === getTodayDayOfWeek()
  );

  const hasTrainedToday = sessions.some(session =>
    isSameDay(session.start_time, new Date()) && !session.is_active
  );

  const handleStartRoutine = async () => {
    if (!todayRoutineSchedule) return;
    try {
      const newSession = await startSession(todayRoutineSchedule.routine);
      router.push(`/workouts/${newSession.id}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar la sesión. Intenta nuevamente.");
    }
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  if (isLoadingProfile || isLoadingSchedules || isLoadingSessions) {
    return <LoadingScreen text="Preparando tu gimnasio..." />;
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          userName={profile?.first_name}
          onProfilePress={handleProfilePress}
        />

        <WeeklySummary
          schedules={routineSchedules}
          currentDayIndex={getTodayDayOfWeek()}
          workoutSessions={sessions}
        />

        <View style={styles.section}>
          <TodayRoutineCard
            schedule={todayRoutineSchedule}
            isLoading={isLoadingSchedules}
            onStart={handleStartRoutine}
            isStarting={isStartingSession}
            hasTrainedToday={hasTrainedToday}
          />
        </View>

      </ScrollView>
    </ScreenContainer>
  );
}

export default Index;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
});
