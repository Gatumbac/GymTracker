import { theme } from "@constants/styles";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "./ScreenContainer";

interface LoadinScreenProps {
  text: string;
}

const LoadingScreen = ({ text }: LoadinScreenProps) => {
  return (
    <ScreenContainer>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </ScreenContainer>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
  },
});