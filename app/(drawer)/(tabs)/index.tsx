import LoadingScreen from "@/components/LoadingScreen";
import ScreenContainer from "@/components/ScreenContainer";
import HomeHeader from "@/components/home/HomeHeader";
import TodayRoutineCard from "@/components/home/TodayRoutineCard";
import WeeklySummary from "@/components/home/WeeklySummary";
import { useProfile } from "@/hooks/useProfile";
import { DayOfWeek } from "@api/types/entities.types";
import { useRoutineSchedules } from "@hooks/useRoutineSchedules";
import { useWorkoutSession } from "@hooks/useWorkoutSession";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const Index = () => {
  const { routineSchedules, isLoading: isLoadingSchedules, refetch } = useRoutineSchedules();
  const { startSession, isLoading: isStartingSession } = useWorkoutSession();
  const router = useRouter();
  const { profile, isLoading: isLoadingProfile } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const getTodayDayOfWeek = (): DayOfWeek => {
    let jsDay = new Date().getDay();
    jsDay = jsDay === 0 ? 6 : jsDay - 1;
    return jsDay;
  };

  const todayRoutineSchedule = routineSchedules.find(
    (schedule) => schedule.day_of_week === getTodayDayOfWeek()
  );

  const handleStartRoutine = async () => {
    if (!todayRoutineSchedule) return;

    try {
      await startSession(todayRoutineSchedule.routine);
      Alert.alert("¡A entrenar!", "Sesión iniciada correctamente.");
      // Optional: Navigate to active session or refresh
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar la sesión. Intenta nuevamente.");
    }
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  if (isLoadingProfile || isLoadingSchedules) {
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
        />

        <View style={styles.section}>
          <TodayRoutineCard
            schedule={todayRoutineSchedule}
            isLoading={isLoadingSchedules}
            onStart={handleStartRoutine}
            isStarting={isStartingSession}
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
