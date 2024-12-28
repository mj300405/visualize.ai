import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';

interface SettingItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isSwitch?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  onPress,
  isSwitch,
  value,
  onValueChange,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={isSwitch}
  >
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      )}
    </View>
    {isSwitch && (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.textTertiary, true: colors.primary }}
        ios_backgroundColor={colors.textTertiary}
      />
    )}
  </TouchableOpacity>
);

const SettingsSection: React.FC<{title: string; children: React.ReactNode}> = ({
  title,
  children
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function SettingsScreen() {
  const [showFPS, setShowFPS] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <SettingsSection title="Visualization">
          <SettingItem
            title="Show FPS Counter"
            subtitle="Display frames per second during animations"
            isSwitch
            value={showFPS}
            onValueChange={setShowFPS}
          />
          <SettingItem
            title="Auto-play Animations"
            subtitle="Automatically start visualizations"
            isSwitch
            value={autoPlay}
            onValueChange={setAutoPlay}
          />
          <SettingItem
            title="Haptic Feedback"
            subtitle="Enable haptics during interactions"
            isSwitch
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
          />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingItem
            title="Version"
            subtitle="1.0.0"
          />
          <SettingItem
            title="Send Feedback"
            onPress={() => {/* Handle feedback */}}
          />
          <SettingItem
            title="Privacy Policy"
            onPress={() => {/* Handle privacy policy */}}
          />
          <SettingItem
            title="Terms of Service"
            onPress={() => {/* Handle terms */}}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: Platform.OS === 'ios' ? 10 : 0,
    marginHorizontal: Platform.OS === 'ios' ? spacing.md : 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.body,
    color: colors.text,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});