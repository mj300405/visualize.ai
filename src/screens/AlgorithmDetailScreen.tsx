import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import LinearRegression from '../visualizations/regression/LinearRegression';

type Props = NativeStackScreenProps<RootStackParamList, 'AlgorithmDetail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Map of algorithm IDs to their components
const algorithmComponents: { [key: string]: React.ComponentType } = {
  'linear-regression': LinearRegression,
};

export default function AlgorithmDetailScreen({ route }: Props) {
  const { id, title, category } = route.params;

  // Get the appropriate visualization component
  const VisualizationComponent = algorithmComponents[id];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={[colors.primary, colors.background]}
          style={styles.header}
        >
          <View style={styles.algorithmInfo}>
            <Text style={styles.category}>{category.toUpperCase()}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Visualization Container */}
          <View style={styles.visualizationContainer}>
            {VisualizationComponent ? (
              <VisualizationComponent />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  Visualization not available
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this Algorithm</Text>
            <Text style={styles.description}>
              {id === 'linear-regression' ? (
                `Linear regression finds the best-fitting line through a set of points by minimizing the sum of squared errors. It's one of the fundamental algorithms in machine learning and statistics.

The visualization above shows how gradient descent iteratively adjusts the line to better fit the data points. The blue dots represent your data, and the white line shows the current prediction.

Try adjusting the learning rate to see how it affects the convergence speed!`
              ) : (
                'Description not available'
              )}
            </Text>
          </View>
        </View>
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
  header: {
    padding: spacing.xl,
    paddingTop: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
  },
  algorithmInfo: {
    marginBottom: spacing.lg,
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  title: {
    ...typography.header,
    color: colors.text,
    fontSize: 32,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  visualizationContainer: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  placeholder: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.md,
  },
  descriptionContainer: {
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});