import { theme } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View } from "react-native";

interface PhysicalStatsCardProps {
  height?: string | number;
  weight?: string | number;
}

export const PhysicalStatsCard = ({ height, weight }: PhysicalStatsCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="fitness-outline" size={20} color={theme.colors.secondary} />
        <Text style={styles.cardTitle}>Datos Físicos</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{height || '--'}</Text>
          <Text style={styles.statUnit}>cm</Text>
          <Text style={styles.statLabel}>Altura</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{weight || '--'}</Text>
          <Text style={styles.statUnit}>kg</Text>
          <Text style={styles.statLabel}>Peso</Text>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  statUnit: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border.light,
  },
});
