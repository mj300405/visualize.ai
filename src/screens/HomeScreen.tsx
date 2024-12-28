import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlgorithmCard } from '../components/common/AlgorithmCard';
import { colors, spacing, typography } from '../theme';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Mock data - we'll move this to a separate file later
const featuredAlgorithms = [
  {
    id: 'linear-regression',
    title: 'Linear Regression',
    description: 'Predict continuous values with the simplest regression model',
    category: 'Regression',
  },
  {
    id: 'k-means',
    title: 'K-Means Clustering',
    description: 'Group similar data points into clusters',
    category: 'Clustering',
  },
  {
    id: 'neural-network',
    title: 'Neural Network',
    description: 'Visualize how neural networks learn patterns',
    category: 'Deep Learning',
  },
];

const recommendedAlgorithms = [
  {
    id: 'decision-tree',
    title: 'Decision Tree',
    description: 'Understand how decision trees split data',
    category: 'Classification',
  },
  {
    id: 'knn',
    title: 'K-Nearest Neighbors',
    description: 'See how KNN classifies based on proximity',
    category: 'Classification',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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
        <LinearGradient
          colors={[colors.primary, colors.background]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Discover Algorithms</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {featuredAlgorithms.map((algo) => (
              <View key={algo.id} style={styles.horizontalCard}>
                <AlgorithmCard
                  title={algo.title}
                  description={algo.description}
                  category={algo.category}
                  onPress={() => handleAlgorithmPress(algo)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {recommendedAlgorithms.map((algo) => (
            <AlgorithmCard
              key={algo.id}
              title={algo.title}
              description={algo.description}
              category={algo.category}
              onPress={() => handleAlgorithmPress(algo)}
            />
          ))}
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
  headerGradient: {
    padding: spacing.xl,
    paddingTop: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
  },
  headerText: {
    ...typography.header,
    color: colors.text,
    fontSize: 32,
  },
  section: {
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    ...typography.subheader,
    color: colors.text,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  horizontalScrollContent: {
    paddingHorizontal: spacing.md,
  },
  horizontalCard: {
    width: 280,
    marginRight: spacing.md,
  },
});