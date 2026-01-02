import { commonStyles } from '@/constants/styles';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: ReactNode;
  centered?: boolean;
}

export default function ScreenContainer({ children, centered }: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 15}
    >
      <ScrollView
        contentContainerStyle={[
          commonStyles.containerScrollable,
          { paddingBottom: Math.max(insets.bottom, 15) }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={centered ? commonStyles.centered : commonStyles.container}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 