import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  GestureResponderEvent,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  onControlPress?: (event: GestureResponderEvent) => void;
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
  onControlPress,
  children
}: VisualizationModalProps<T>) {
  const modalHeight = Platform.OS === 'ios' ? 
    SCREEN_HEIGHT : 
    SCREEN_HEIGHT - (StatusBar.currentHeight || 0);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>

        {/* Visualization Container */}
        <View style={styles.visualizationWrapper}>
          <BaseVisualizationContainer<T>
            width={SCREEN_WIDTH - spacing.md * 2}
            height={modalHeight * 0.6}
            data={data}
            state={state}
            config={config}
            handlers={handlers}
            onPress={onPress}
            onMove={onMove}
            onControlPress={onControlPress}
          >
            {children}
          </BaseVisualizationContainer>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight! + 10,
    right: spacing.md,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualizationWrapper: {
    flex: 1,
    marginTop: 60,
  },
});

export default VisualizationModal;