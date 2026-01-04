import Button from '@/components/Button';
import LoadingScreen from '@/components/LoadingScreen';
import ScreenContainer from '@/components/ScreenContainer';
import { commonStyles, theme } from '@/constants/styles';
import { exercisesEndpoints } from '@api/endpoints/exercises';
import { Exercise } from '@api/types/entities.types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setIsLoading(true);
        const response = await exercisesEndpoints.retrieveExercise(id);
        setExercise(response.data);
      } catch (error) {
        console.error("Failed to fetch exercise", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchExercise();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingScreen text="Cargando ejercicio..." />;
  }

  if (!exercise) {
    return (
      <ScreenContainer>
        <Text style={styles.errorText}>No se encontró el ejercicio.</Text>
        <Button title="Volver" onPress={() => router.back()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>{exercise.name}</Text>

      <View style={styles.imageContainer}>
        {exercise.image_url ? (
          <Image
            source={{ uri: exercise.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="body-outline" size={80} color="#ccc" />
          </View>
        )}
      </View>

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

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>
        {exercise.description || "Sin descripción disponible."}
      </Text>

      <Button
        title="Volver"
        onPress={() => router.back()}
      />
    </ScreenContainer>
  );
};

export default ExerciseDetail;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.text.primary,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
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
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  badgeMuscle: {
    backgroundColor: theme.colors.secondaryLight + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeType: {
    backgroundColor: theme.colors.accent + '30',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
    textAlign: 'center'
  }
});

