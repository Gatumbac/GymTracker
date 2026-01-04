import { theme } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View } from "react-native";

interface BioCardProps {
  bio?: string;
}

export const BioCard = ({ bio }: BioCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="document-text-outline" size={20} color={theme.colors.accentDark} />
        <Text style={styles.cardTitle}>Sobre mí</Text>
      </View>

      <Text style={styles.bioText}>
        {bio || 'Escribe una biografía para que los demás te conozcan mejor.'}
      </Text>
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
  bioText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
