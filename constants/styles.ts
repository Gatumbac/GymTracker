import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    // Colores principales - Energéticos y motivadores
    primary: '#FF6B35',      // Naranja vibrante (energía, pasión)
    primaryDark: '#E55A2B',  // Naranja oscuro (hover/pressed)
    primaryLight: '#FF8F66', // Naranja claro (backgrounds)

    secondary: '#10B981',    // Verde esmeralda (crecimiento, salud, progreso)
    secondaryDark: '#059669',
    secondaryLight: '#34D399',

    accent: '#FFD23F',       // Amarillo dorado (logros, premium)
    accentDark: '#E6BD2F',

    // Colores funcionales
    success: '#10B981',      // Verde moderno (progreso, completado)
    warning: '#F59E0B',      // Ámbar (advertencias)
    error: '#EF4444',        // Rojo (errores, eliminar)
    info: '#3B82F6',         // Azul (información)

    // Neutrales
    white: '#FFFFFF',
    black: '#000000',
    background: '#F8FAFC',   // Gris muy claro
    surface: '#FFFFFF',      // Blanco para tarjetas

    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    text: {
      primary: '#1F2937',    // Casi negro
      secondary: '#6B7280',  // Gris medio
      disabled: '#9CA3AF',   // Gris claro
      inverse: '#FFFFFF',    // Blanco para fondos oscuros
    },
    border: {
      default: '#D1D5DB',  // Cambiado de #E5E7EB (gray-300 en lugar de gray-200)
      light: '#E5E7EB',
      dark: '#9CA3AF',
    },
  },
  spacing: {
    xs: 5,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 28,
    xxl: 40,
  },
  borderRadius: {
    sm: 5,
    md: 8,
    lg: 12,
    full: 9999,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    } as const,
  },
};

export const commonStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    flexDirection: 'column',
  },
  containerScrollable: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    flexDirection: 'column',
  },

  // Typography
  title: {
    fontSize: theme.typography.sizes.xxl,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
  },

  // Inputs
  input: {
    height: 50,
    borderColor: theme.colors.border.dark,
    borderWidth: 1.5,
    marginBottom: theme.spacing.sm + 2,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.sizes.md,
  },

  // Layout
  buttonContainer: {
    marginTop: theme.spacing.sm,
  },
  spacerSm: {
    height: theme.spacing.sm,
  },
  spacerMd: {
    height: theme.spacing.md,
  },
  spacerLg: {
    height: theme.spacing.lg,
  },
});