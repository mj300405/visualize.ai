import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  GestureResponderEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';
import { BaseVisualizationProps } from '../../types/visualization';
import BaseVisualizationContainer from './BaseVisualization';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface VisualizationModalProps<T extends BaseVisualizationProps> {
  visible: boolean;
  onClose: () => void;
  onPress?: (event: GestureResponderEvent) => void;
  onMove?: (event: GestureResponderEvent) => void;
  width: number;
  height: number;
  data: T['data'];
  state: T['state'];
  config: T['config'];
  handlers: T['handlers'];
  children: React.ReactNode;
}

function VisualizationModal<T extends BaseVisualizationProps>({
  visible,
  onClose,
  onPress,
  onMove,
  data,
  state,
  config,
  handlers,
  children
}: VisualizationModalProps<T>) {
  // Calculate dimensions accounting for safe area and status bar
  const modalHeight = Platform.OS === 'ios' ? 
    SCREEN_HEIGHT : 
    SCREEN_HEIGHT - StatusBar.currentHeight!;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Visualization Container */}
        <View style={styles.visualizationContainer}>
          <BaseVisualizationContainer<T>
            width={SCREEN_WIDTH}
            height={modalHeight - 150}
            data={data}
            state={state}
            config={config}
            handlers={handlers}
            onPress={onPress}
            onMove={onMove}
          >
            {children}
          </BaseVisualizationContainer>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  closeButton: {
    padding: spacing.sm,
  },
  visualizationContainer: {
    flex: 1,
  },
});

export default VisualizationModal;