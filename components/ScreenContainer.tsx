import { commonStyles } from '@/constants/styles';
import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

interface ScreenContainerProps {
  children: ReactNode;
  centered?: boolean;
}

export default function ScreenContainer({ children, centered }: ScreenContainerProps) {
  return (
    <ScrollView contentContainerStyle={commonStyles.containerScrollable}>
      <View style={centered ? commonStyles.centered : commonStyles.container}>
        {children}
      </View>
    </ScrollView>
  );
} 