import { theme } from '@/constants/styles';
import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  children?: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export default function Button({
  title,
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  isLoading = false,
  variant = 'primary',
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    (disabled || isLoading) && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.textBase,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  // Determinar color del spinner según variante
  const getSpinnerColor = () => {
    if (variant === 'outline') {
      return theme.colors.primary;
    }
    return theme.colors.text.inverse;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={getSpinnerColor()} />
      ) : (
        title ? <Text style={buttonTextStyle}>{title}</Text> : children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  disabled: {
    backgroundColor: theme.colors.gray[300],
    borderColor: theme.colors.gray[300],
  },
  textBase: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.text.inverse,
  },
  secondaryText: {
    color: theme.colors.text.inverse,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  dangerText: {
    color: theme.colors.text.inverse,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },
});