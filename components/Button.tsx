import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  children?: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({
  title,
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.textBase,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {title ? <Text style={buttonTextStyle}>{title}</Text> : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '80%', 
    maxWidth: 300, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  primary: {
    backgroundColor: '#007AFF', // Azul estándar
  },
  secondary: {
    backgroundColor: '#6B7280', // Gris
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  disabled: {
    backgroundColor: '#D1D5DB',
    borderColor: '#D1D5DB',
  },
  textBase: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: '#007AFF',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});