import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { AlgorithmCard } from '../components/common/AlgorithmCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Mock data for favorites - later this will come from storage/state
const favoriteAlgorithms = [
  {
    id: 'neural-network',
    title: 'Neural Network',
    description: 'Visualize how neural networks learn patterns',
    category: 'Deep Learning',
  },
  {
    id: 'k-means',
    title: 'K-Means Clustering',
    description: 'Group similar data points into clusters',
    category: 'Clustering',
  },
];

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const handleAlgorithmPress = (algo: {
    id: string;
    title: string;
    category: string;
  }) => {
    navigation.navigate('AlgorithmDetail', {
      id: algo.id,
      title: algo.title,
      category: algo.category,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.content}>
          {favoriteAlgorithms.length > 0 ? (
            favoriteAlgorithms.map((algo) => (
              <AlgorithmCard
                key={algo.id}
                title={algo.title}
                description={algo.description}
                category={algo.category}
                onPress={() => handleAlgorithmPress(algo)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No favorite algorithms yet
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Add algorithms to your favorites to see them here
              </Text>
            </View>
          )}
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
  content: {
    padding: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyStateText: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyStateSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});