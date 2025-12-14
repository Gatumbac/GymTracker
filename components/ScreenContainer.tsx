import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface ScreenContainerProps {
  children: ReactNode;
}

export default function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Permite que ScrollView crezca si el contenido es pequeño
  },
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});