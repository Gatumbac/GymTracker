import { theme } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View } from "react-native";

interface PersonalInfoCardProps {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
}

export const PersonalInfoCard = ({ firstName, lastName, birthDate }: PersonalInfoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person-outline" size={20} color={theme.colors.primary} />
        <Text style={styles.cardTitle}>Información Personal</Text>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{firstName} {lastName}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Fecha De Nacimiento</Text>
          <Text style={styles.infoValue}>{birthDate || 'No especificado'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    paddingBottom: theme.spacing.sm,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  infoGrid: {
    gap: theme.spacing.md,
  },
  infoItem: {
    marginBottom: theme.spacing.xs,
  },
  infoLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.medium,
  },
});
