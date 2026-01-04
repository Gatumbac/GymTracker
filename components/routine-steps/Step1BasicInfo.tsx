import TextInput from '@/components/TextInput';
import { commonStyles, theme } from '@/constants/styles';
import { Day, DayOfWeek } from '@api/types/entities.types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Step1BasicInfoProps {
  name: string;
  description: string;
  selectedDays: DayOfWeek[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDayToggle: (day: DayOfWeek) => void;
  nameError?: string;
  daysError?: string;
  avalaibleDays: Day[];
}

export default function Step1BasicInfo({
  name,
  description,
  selectedDays,
  onNameChange,
  onDescriptionChange,
  onDayToggle,
  nameError,
  daysError,
  avalaibleDays
}: Step1BasicInfoProps) {

  return (
    <View>
      <Text style={styles.sectionTitle}>Información Básica</Text>

      <TextInput
        label="Nombre de la rutina *"
        placeholder="Ej: Rutina de Pecho y Tríceps"
        value={name}
        onChangeText={onNameChange}
        error={nameError}
      />

      <TextInput
        label="Descripción (opcional)"
        placeholder="Describe tu rutina..."
        value={description}
        onChangeText={onDescriptionChange}
        multiline
        numberOfLines={3}
        style={styles.textArea}
      />

      <Text style={commonStyles.label}>Días de entrenamiento *</Text>
      {daysError && <Text style={styles.errorText}>{daysError}</Text>}
      <View style={styles.daysContainer}>
        {
          avalaibleDays.length === 0 && (
            <Text style={styles.errorText}>No tienes días disponibles para agendar rutinas. Organiza tus horarios para agregar más.</Text>
          )
        }
        {
          avalaibleDays.map((day) => (
            <TouchableOpacity
              key={day.id}
              style={[styles.dayChip, selectedDays.includes(day.id) && styles.dayChipActive]}
              onPress={() => onDayToggle(day.id)}
            >
              <Text style={[styles.dayText, selectedDays.includes(day.id) && styles.dayTextActive]}>
                {day.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  dayChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
  },
  dayChipActive: {
    backgroundColor: theme.colors.primaryLight + '20',
    borderColor: theme.colors.primary,
  },
  dayText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  dayTextActive: {
    color: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginVertical: theme.spacing.xs,
  },
  loadingContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
});
