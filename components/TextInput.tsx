import { commonStyles, theme } from '@/constants/styles';
import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export default function TextInput({
  label,
  error,
  style,
  ...props
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={commonStyles.label}>{label}</Text>}
      <RNTextInput
        style={[
          commonStyles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={theme.colors.text.disabled}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: -theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
});
