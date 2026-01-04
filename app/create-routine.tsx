import Button from '@/components/Button';
import LoadingScreen from '@/components/LoadingScreen';
import Step1BasicInfo from '@/components/routine-steps/Step1BasicInfo';
import Step2SelectExercises from '@/components/routine-steps/Step2SelectExercises';
import Step3ConfigureExercises from '@/components/routine-steps/Step3ConfigureExercises';
import ScreenContainer from '@/components/ScreenContainer';
import { commonStyles, theme } from '@/constants/styles';
import { useExercises } from '@/hooks/useExercises';
import { useRoutines } from '@/hooks/useRoutines';
import { useRoutineSchedules } from '@/hooks/useRoutineSchedules';
import { Day, DayOfWeek } from '@api/types/entities.types';
import { Ionicons } from '@expo/vector-icons';
import { RoutineStep1ValidationErrors, validateExerciseConfig, validateRoutineStep1 } from '@utils/validation';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface ExerciseConfig {
  target_sets?: number;
  target_reps?: number;
  rest_time_seconds?: number;
}

const DAYS_OF_WEEK: Day[] = [
  { id: DayOfWeek.Monday, name: 'Lunes' },
  { id: DayOfWeek.Tuesday, name: 'Martes' },
  { id: DayOfWeek.Wednesday, name: 'Miércoles' },
  { id: DayOfWeek.Thursday, name: 'Jueves' },
  { id: DayOfWeek.Friday, name: 'Viernes' },
  { id: DayOfWeek.Saturday, name: 'Sábado' },
  { id: DayOfWeek.Sunday, name: 'Domingo' },
];

export default function CreateRoutineScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [exerciseConfigs, setExerciseConfigs] = useState<Map<number, ExerciseConfig>>(new Map());
  const [validationErrors, setValidationErrors] = useState<RoutineStep1ValidationErrors>({});
  const [configValidationErrors, setConfigValidationErrors] = useState<Map<number, string>>(new Map());
  const [isNavigatingStep, setIsNavigatingStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    exercises,
    muscleGroups,
    exerciseTypes,
    selectedMuscleGroup,
    selectedExerciseType,
    setSelectedMuscleGroup,
    setSelectedExerciseType,
    isLoading: loadingExercises,
  } = useExercises();

  const { createRoutine } = useRoutines();
  const { createSchedules, routineSchedules, isLoading: loadingSchedules } = useRoutineSchedules();

  const avalaibleDays = DAYS_OF_WEEK.filter(day => !routineSchedules.some(schedule => schedule.day_of_week === day.id));

  const selectedExercises = useMemo(() => {
    return exercises.filter(ex => selectedExerciseIds.includes(ex.id));
  }, [exercises, selectedExerciseIds]);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleExercise = (id: number) => {
    setSelectedExerciseIds(prev => {
      const isCurrentlySelected = prev.includes(id);
      if (isCurrentlySelected) {
        return prev.filter(eid => eid !== id);
      } else {
        setExerciseConfigs(prevConfigs => {
          const newConfigs = new Map(prevConfigs);
          if (!newConfigs.has(id)) {
            newConfigs.set(id, {
              target_sets: 4,
              target_reps: 12,
              rest_time_seconds: 120,
            });
          }
          return newConfigs;
        });
        return [...prev, id];
      }
    });
  };

  const removeExercise = (id: number) => {
    setSelectedExerciseIds(prev => prev.filter(eid => eid !== id));
    setExerciseConfigs(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const updateExerciseConfig = (id: number, config: ExerciseConfig) => {
    setExerciseConfigs(prev => new Map(prev).set(id, config));
  };

  const canGoToStep2 = selectedDays.length > 0;
  const canGoToStep3 = selectedExerciseIds.length > 0;

  const handleNext = async () => {
    if (step === 1) {
      const errors = validateRoutineStep1({
        name,
        selectedDays: selectedDays.length,
      });

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      if (!canGoToStep2) {
        Alert.alert('Atención', 'Debes seleccionar al menos un día');
        return;
      }

      setValidationErrors({});
      setIsNavigatingStep(true);
      // Pequeño delay para que se vea el spinner y la transición sea más suave
      setTimeout(() => {
        setStep(2);
        setIsNavigatingStep(false);
      }, 500);
    } else if (step === 2) {
      if (!canGoToStep3) {
        Alert.alert('Atención', 'Debes seleccionar al menos un ejercicio');
        return;
      }
      setIsNavigatingStep(true);
      setTimeout(() => {
        setStep(3);
        setIsNavigatingStep(false);
      }, 500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      Alert.alert('¿Desea cancelar?', 'Se perderán los cambios', [
        { text: 'Cancelar', onPress: () => { } },
        { text: 'Sí', onPress: () => router.back() },
      ]);
    }
  };

  const handleCreate = async () => {
    if (selectedExerciseIds.length === 0) {
      Alert.alert('Error', 'No hay ejercicios seleccionados');
      return;
    }

    const errors = new Map<number, string>();

    selectedExerciseIds.forEach(exerciseId => {
      const config = exerciseConfigs.get(exerciseId) || {};
      const validation = validateExerciseConfig(config);
      if (!validation.isValid && validation.error) {
        errors.set(exerciseId, validation.error);
      }
    });

    if (errors.size > 0) {
      setConfigValidationErrors(errors);
      Alert.alert('Error', 'Por favor corrige la configuración de los ejercicios');
      return;
    }

    setConfigValidationErrors(new Map());
    setIsSubmitting(true);

    try {
      const items = selectedExerciseIds.map((exerciseId, index) => {
        const config = exerciseConfigs.get(exerciseId)!;
        return {
          exercise: exerciseId,
          order: index,
          target_sets: config.target_sets,
          target_reps: config.target_reps,
          rest_time_seconds: config.rest_time_seconds,
        };
      });

      const routine = await createRoutine({
        name: name.trim(),
        description: description.trim() || undefined,
        items,
      });

      await createSchedules(routine.id, selectedDays);

      Alert.alert('¡Éxito!', 'Rutina creada correctamente', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/routines') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la rutina');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingExercises || loadingSchedules) {
    return <LoadingScreen text="Cargando ejercicios y horarios..." />;
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={40} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={commonStyles.title}>Crear Rutina</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.stepper}>
        {[1, 2, 3].map((s) => (
          <View key={s} style={styles.stepperItem}>
            <View style={[styles.stepCircle, step >= s && styles.stepCircleActive]}>
              <Text style={[styles.stepText, step >= s && styles.stepTextActive]}>{s}</Text>
            </View>
            {s < 3 && <View style={[styles.stepLine, step > s && styles.stepLineActive]} />}
          </View>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {step === 1 && (
          <Step1BasicInfo
            name={name}
            description={description}
            selectedDays={selectedDays}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onDayToggle={toggleDay}
            nameError={validationErrors.name}
            daysError={validationErrors.days}
            avalaibleDays={avalaibleDays}
          />
        )}

        {step === 2 && (
          <Step2SelectExercises
            exercises={exercises}
            muscleGroups={muscleGroups}
            exerciseTypes={exerciseTypes}
            selectedExerciseIds={selectedExerciseIds}
            selectedMuscleGroup={selectedMuscleGroup}
            selectedExerciseType={selectedExerciseType}
            onToggleExercise={toggleExercise}
            onSelectMuscleGroup={setSelectedMuscleGroup}
            onSelectExerciseType={setSelectedExerciseType}
          />
        )}

        {step === 3 && (
          <Step3ConfigureExercises
            selectedExercises={selectedExercises}
            exerciseConfigs={exerciseConfigs}
            configErrors={configValidationErrors}
            onConfigChange={updateExerciseConfig}
            onRemove={removeExercise}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        {step < 3 ? (
          <Button
            title="Siguiente"
            onPress={handleNext}
            isLoading={isNavigatingStep}
          />
        ) : (
          <Button
            title="Crear Rutina"
            onPress={handleCreate}
            isLoading={isSubmitting}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xxl,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  placeholder: {
    width: 40,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  stepperItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: theme.colors.primary,
  },
  stepText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.secondary,
  },
  stepTextActive: {
    color: theme.colors.text.inverse,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.gray[200],
  },
  stepLineActive: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  footer: {
    marginTop: theme.spacing.lg,
    width: '100%'
  },
});
