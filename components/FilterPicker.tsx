import { theme } from '@/constants/styles';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

interface FilterOption {
  id: number;
  name: string;
}

interface FilterPickerProps {
  label: string;
  options: FilterOption[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function FilterPicker({ label, options, selectedId, onSelect }: FilterPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedId}
          onValueChange={(value: number | null) => onSelect(value)}
          style={styles.picker}
        >
          <Picker.Item label="Todos" value={null} />
          {options.map((option) => (
            <Picker.Item key={option.id} label={option.name} value={option.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%'
  },

  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white,
  },
  picker: {
    height: 55,
  },
});
