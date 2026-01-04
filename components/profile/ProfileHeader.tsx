import { theme } from "@/constants/styles";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  firstName?: string;
  lastName?: string;
  username: string;
  email?: string;
}

export const ProfileHeader = ({ firstName, lastName, username, email }: ProfileHeaderProps) => {
  return (
    <View style={styles.headerCard}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${firstName || 'U'}+${lastName || 'N'}&background=random&color=fff&size=200`
          }}
          style={styles.avatar}
        />
        <View style={styles.onlineBadge} />
      </View>
      <Text style={styles.userName}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.userHandle}>@{username}</Text>
      {email && <Text style={styles.userEmail}>{email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.success,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  userName: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  userHandle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
  },
});
